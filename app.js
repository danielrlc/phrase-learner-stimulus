;(() => {
  const application = Stimulus.Application.start()

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text']
      }
      initialize() {
        this.buildWords(false)
      }

      rawText =
        'When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.'
      words = []
      text = ''
      allWordsAreShown = false
      hintsAreShown = true
      wordLengthHintsAreShown = true

      buildWords(allWordsAreShownLocal) {
        this.words = []
        this.rawText.split(' ').map((word, position) => {
          this.words = [
            ...this.words,
            { word, position, wordIsShown: allWordsAreShownLocal },
          ]
        })
        this.renderText()
      }

      renderText() {
        this.text = ''
        this.words.map(({ word, position, wordIsShown }) => {
          let hint = ''
          let blank = ''
          if (this.wordLengthHintsAreShown) {
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
          this.text += `<span id="${position}" data-action="click->sentence#flipWord">${
            wordIsShown ? word : this.hintsAreShown ? hint : blank
          }</span> `
        })
        this.textTarget.innerHTML = this.text
      }

      flipSentence() {
        if (this.allWordsAreShown) {
          this.buildWords(false)
          this.allWordsAreShown = false
        } else {
          this.buildWords(true)
          this.allWordsAreShown = true
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

      flipWordLengthHints() {
        this.wordLengthHintsAreShown = !this.wordLengthHintsAreShown
        this.renderText()
      }
    },
  )
})()
