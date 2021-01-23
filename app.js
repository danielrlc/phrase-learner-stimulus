;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text']
      }

      initialize() {
        this.buildWordsRegister()
        this.buildInitialWordsShownRegister()
        this.buildText()
      }

      rawText = 'The small boys came early to the hanging.'
      renderedText = ''
      textWords = []
      wordsRegister = []
      wordsShownRegister = []
      allWordsAreShown = false
      hintsAreShown = true

      buildWordsRegister() {
        this.wordsRegister = this.rawText.split(' ').map((word) => {
          let hint = ''
          let blank = ''
          word.split('').map((letter, position) => {
            if (position === 0) {
              hint += letter
              blank += '_'
            } else {
              hint += '_'
              blank += '_'
            }
          })
          return {
            word,
            hint,
            blank,
          }
        })
      }

      buildInitialWordsShownRegister() {
        this.wordsShownRegister = Array(this.wordsRegister.length).fill(
          this.allWordsAreShown,
        )
      }

      renderText() {
        this.renderedText = ''
        this.textWords.map(({ word, position, wordIsShown }) => {
          let hint = ''
          let blank = ''
          if (this.hintsAreShown) {
            word.split('').map((letter, position) => {
              if (position === 0) {
                hint += letter
                blank += '_'
              } else {
                hint += '_'
                blank += '_'
              }
            })
          } else {
            hint += `${word[0]}___`
            blank += '____'
          }
          this.renderedText += `<span id="${position}" data-action="click->sentence#flipWordAndBuildText">${
            wordIsShown ? word : this.hintsAreShown ? hint : blank
          }</span> `
        })
        this.textTarget.innerHTML = this.renderedText
      }

      flipAllWords() {
        this.allWordsAreShown = !this.allWordsAreShown
        this.wordsShownRegister = this.wordsShownRegister.map(
          (wordIsShown) => this.allWordsAreShown,
        )
        this.buildText()
      }

      buildText() {
        this.textWords = []
        this.rawText.split(' ').map((word, position) => {
          this.textWords = this.textWords.concat({
            word,
            position,
            wordIsShown: this.allWordsAreShown,
          })
        })
        this.renderText()
      }

      flipWordAndBuildText(event) {
        const wordPosition = Number(event.target.id)
        this.textWords = this.textWords.map(
          ({ word, position, wordIsShown }) => {
            if (position === wordPosition) {
              return {
                word,
                position,
                wordIsShown: !wordIsShown,
              }
            } else {
              return {
                word,
                position,
                wordIsShown,
              }
            }
          },
        )
        this.wordsShownRegister = this.wordsShownRegister.map(
          (wordIsShown, position) => {
            if (position === wordPosition) {
              return !wordIsShown
            } else {
              return wordIsShown
            }
          },
        )
        this.renderText()
      }

      flipHints() {
        this.hintsAreShown = !this.hintsAreShown
        this.renderText()
      }
    },
  )
})()
