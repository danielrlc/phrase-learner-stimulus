;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text']
      }

      showAllWords = "showAllWords"
      hideAllWords = "hideAllWords"

      initialize() {
        this.showOrHideAllWords(this.hideAllWords)
      }

      rawText =
        'Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.'
      words = []
      renderedText = ''
      allWordsAreShown = false
      hintsAreShown = true

      areAllWordsShown() {
        if (this.words.map((word) => word.wordIsShown).every(true)) {
          this.allWordsAreShown = true
        } else {
          this.allWordsAreShown = false
        }
      }

      showOrHideAllWords(showOrHide) {
        this.allWordsAreShown = showOrHide === this.showAllWords ? true : false
        this.words = []
        this.rawText.split(' ').map((word, position) => {
          this.words = [
            ...this.words,
            { word, position, wordIsShown: this.allWordsAreShown },
          ]
        })
        this.renderText()
      }

      renderText() {
        this.renderedText = ''
        this.words.map(({ word, position, wordIsShown }) => {
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
          this.showOrHideAllWords(this.hideAllWords)
        } else {
          this.showOrHideAllWords(this.showAllWords)
        }
      }

      flipWord(event) {
        const wordPosition = Number(event.target.id)
        this.words = this.words.map(({ word, position, wordIsShown }) => {
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
        })
        this.renderText()
      }

      flipHints() {
        this.hintsAreShown = !this.hintsAreShown
        this.renderText()
      }
    },
  )
})()
