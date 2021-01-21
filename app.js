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

      buildWords(wordsAreShown) {
        this.words = []
        this.rawText.split(' ').map((text, position) => {
          this.words = [
            ...this.words,
            { text, position, isShown: wordsAreShown },
          ]
        })
        this.buildText()
      }
      allWordsAreShown = false

      text = ''
      buildText() {
        this.text = ''
        this.words.map(({ text, position, isShown }) => {
          this.text += `<span id="${position}" data-action="click->sentence#flipWord">${
            isShown ? text : '____'
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
        this.words = this.words.map(({ text, position, isShown }) => {
          if (position === wordPosition) {
            return {
              text,
              position,
              isShown: !isShown,
            }
          } else {
            return {
              text,
              position,
              isShown,
            }
          }
        })
        this.buildText()
      }
    },
  )
})()
