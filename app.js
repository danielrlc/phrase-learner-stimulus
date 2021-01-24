;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'phrase-flipper',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text', 'hintsButton', 'sentenceButton']
      }

      initialize() {
        this.buildWordsStore()
        this.buildWordsShownStore()
        this.renderView()
      }

      rawText = 'The small boys came early to the hanging.'
      wordsStore = []
      wordsShownStore = []
      allWordsAreShown = false
      hintsAreShown = true

      buildWordsStore() {
        this.wordsStore = this.rawText.split(' ').map((word, position) => {
          let hint = ''
          word
            .split('')
            .map((letter, position) =>
              position === 0 ? (hint += letter) : (hint += '_'),
            )
          return {
            word,
            hint,
            position,
          }
        })
      }

      buildWordsShownStore() {
        this.wordsShownStore = Array(this.wordsStore.length).fill(
          this.allWordsAreShown,
        )
      }

      flipWord(event) {
        const wordPosition = Number(event.target.id)
        this.wordsShownStore = this.wordsShownStore.map(
          (wordIsShown, position) => {
            if (position === wordPosition) {
              return !wordIsShown
            } else {
              return wordIsShown
            }
          },
        )
        this.renderView()
      }

      flipHints() {
        this.hintsAreShown = !this.hintsAreShown
        this.renderView()
      }

      flipAllWords() {
        this.allWordsAreShown = !this.allWordsAreShown
        this.wordsShownStore = this.wordsShownStore.map(
          (wordIsShown) => this.allWordsAreShown,
        )
        this.renderView()
      }

      renderView() {
        this.checkIfAllWordsAreShown()
        this.renderText()
        this.renderButtons()
      }

      checkIfAllWordsAreShown() {
        if (this.wordsShownStore.includes(false)) {
          this.allWordsAreShown = false
        } else {
          this.allWordsAreShown = true
        }
      }

      removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild)
        }
      }

      renderText() {
        this.removeAllChildNodes(this.textTarget)
        this.wordsStore.map(({ word, hint, position }) => {
          const wordIsShown = this.wordsShownStore[position]
          const blank = '____'
          const wordElement = document.createElement('span')
          wordElement.id = position
          wordElement.setAttribute('data-action', 'click->phrase-flipper#flipWord')
          wordElement.textContent = wordIsShown
            ? word
            : this.hintsAreShown
            ? hint
            : blank
          const spaceBetweenWordsElement = document.createElement('span')
          spaceBetweenWordsElement.textContent = ' '
          this.textTarget.appendChild(wordElement)
          this.textTarget.appendChild(spaceBetweenWordsElement)
        })
      }

      renderButtons() {
        if (this.allWordsAreShown) {
          this.hintsButtonTarget.classList.add(
            'pointer-events-none',
            'opacity-25',
          )
        } else {
          this.hintsButtonTarget.classList.remove(
            'pointer-events-none',
            'opacity-25',
          )
        }
        this.hintsButtonTarget.textContent = this.hintsAreShown
          ? 'Hide hints'
          : 'Show hints'
        this.sentenceButtonTarget.textContent = this.allWordsAreShown
          ? 'Hide sentence'
          : 'Show sentence'
      }
    },
  )
})()
