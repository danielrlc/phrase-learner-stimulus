;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text', 'hintsButton', 'sentenceButton']
      }

      initialize() {
        this.buildWordsRegister()
        this.buildInitialWordsShownRegister()
        this.prepareButtons()
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
          word.split('').map((letter, position) => {
            if (position === 0) {
              hint += letter
            } else {
              hint += '_'
            }
          })
          return {
            word,
            hint,
            position,
          }
        })
      }

      buildInitialWordsShownRegister() {
        this.wordsShownRegister = Array(this.wordsRegister.length).fill(
          this.allWordsAreShown,
        )
      }

      prepareButtons() {
        this.hintsButtonTarget.textContent = this.hintsAreShown
          ? 'Hide hints'
          : 'Show hints'
        this.sentenceButtonTarget.textContent = this.allWordsAreShown
          ? 'Hide sentence'
          : 'Show sentence'
      }

      flipWord(event) {
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
        this.areAllWordsShown()
        this.sentenceButtonTarget.textContent = this.allWordsAreShown
          ? 'Hide sentence'
          : 'Show sentence'
        this.renderText()
      }

      flipHints() {
        this.hintsAreShown = !this.hintsAreShown
        this.hintsButtonTarget.textContent = this.hintsAreShown
          ? 'Hide hints'
          : 'Show hints'
        this.renderText()
      }

      flipAllWords() {
        this.allWordsAreShown = !this.allWordsAreShown
        this.wordsShownRegister = this.wordsShownRegister.map(
          (wordIsShown) => this.allWordsAreShown,
        )
        this.sentenceButtonTarget.textContent = this.allWordsAreShown
          ? 'Hide sentence'
          : 'Show sentence'
        this.areAllWordsShown()
        this.renderText()
      }

      areAllWordsShown() {
        if (this.wordsShownRegister.includes(false)) {
          this.allWordsAreShown = false
          this.hintsButtonTarget.classList.remove(
            'pointer-events-none',
            'opacity-25',
          )
        } else {
          this.allWordsAreShown = true
          this.hintsButtonTarget.classList.add(
            'pointer-events-none',
            'opacity-25',
          )
        }
      }

      renderText() {
        let renderedText = ''
        this.wordsRegister.map(({ word, hint, position }) => {
          renderedText += `<span id="${position}" data-action="click->sentence#flipWord">${
            this.wordsShownRegister[position]
              ? word
              : this.hintsAreShown
              ? hint
              : '____'
          }</span> `
        })
        this.textTarget.innerHTML = renderedText
      }
    },
  )
})()
