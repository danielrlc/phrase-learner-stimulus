(() => {
  const application = Stimulus.Application.start();

  application.register(
    'sentence',
    class extends Stimulus.Controller {
      static get targets() {
        return ['text'];
      }
      initialize() {
        this.buildWordsData(false);
        this.textTarget.innerHTML = this.text;
      }

      rawText =
        'When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.';
      wordsData = [];

      buildWordsData(wordsAreShown) {
        this.wordsData = [];
        this.rawText.split(' ').map((word, position) => {
          this.wordsData = [
            ...this.wordsData,
            { word, position, isShown: wordsAreShown },
          ];
        });
        this.buildText();
      }
      allWordsAreShown = false;

      text = '';
      buildText() {
        this.text = '';
        this.wordsData.map(({ word, position, isShown }) => {
          this.text += `<span id="${position}" data-action="click->sentence#flipWord">${
            isShown ? word : '____'
          }</span> `;
        });
        this.textTarget.innerHTML = this.text;
      }

      flipSentence() {
        if (this.allWordsAreShown) {
          this.buildWordsData(false);
          this.allWordsAreShown = false;
        } else {
          this.buildWordsData(true);
          this.allWordsAreShown = true;
        }
      }

      flipWord(event) {
        console.log(event.target.id);
      }
    },
  );
})();
