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
        this.renderText()
      }

      rawText = 'The small boys came early to the hanging.'
      wordsRegister = []
      wordsShownRegister = []
      allWordsAreShown = false
      hintsAreShown = true

      buildWordsRegister() {
        this.wordsRegister = this.rawText.split(' ').map((word, position) => {
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
            position,
          }
        })
      }

      buildInitialWordsShownRegister() {
        this.wordsShownRegister = Array(this.wordsRegister.length).fill(
          this.allWordsAreShown,
        )
      }

      renderText() {
        let renderedText = ''
        this.wordsRegister.map(({ word, hint, blank, position }) => {
          renderedText += `<span id="${position}" data-action="click->sentence#flipWordAndBuildText">${
            this.wordsShownRegister[position]
              ? word
              : this.hintsAreShown
              ? hint
              : blank
          }</span> `
        })
        this.textTarget.innerHTML = renderedText
      }

      flipAllWords() {
        this.allWordsAreShown = !this.allWordsAreShown
        this.wordsShownRegister = this.wordsShownRegister.map(
          (wordIsShown) => this.allWordsAreShown,
        )
        this.renderText()
      }

      flipWordAndBuildText(event) {
        const wordPosition = Number(event.target.id)
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
