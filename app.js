;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text']
      }

      initialize() {
        this.showOrHideAllWords(this.HIDE_ALL_WORDS)
      }

      SHOW_ALL_WORDS = 'showAllWords'
      HIDE_ALL_WORDS = 'hideAllWords'
      rawText =
        'The small boys came early to the hanging.'
      renderedText = ''
      textWords = []
      allWordsAreShown = false
      hintsAreShown = true

      showOrHideAllWords(showOrHide) {
        this.allWordsAreShown =
          showOrHide === this.SHOW_ALL_WORDS ? true : false
        this.textWords = []
        this.rawText.split(' ').map((word, position) => {
          this.textWords = [
            ...this.textWords,
            { word, position, wordIsShown: this.allWordsAreShown },
          ]
        })
        this.renderText()
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
          this.renderedText += `<span id="${position}" data-action="click->sentence#flipWord">${
            wordIsShown ? word : this.hintsAreShown ? hint : blank
          }</span> `
        })
        this.textTarget.innerHTML = this.renderedText
      }

      flipSentence() {
        if (this.allWordsAreShown) {
          this.showOrHideAllWords(this.HIDE_ALL_WORDS)
        } else {
          this.showOrHideAllWords(this.SHOW_ALL_WORDS)
        }
      }

      flipWord(event) {
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
        this.renderText()
      }

      flipHints() {
        this.hintsAreShown = !this.hintsAreShown
        this.renderText()
      }
    },
  )
})()
