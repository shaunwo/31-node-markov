/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	// BEGIN CODE PROVIDED BY SPRINGBOARD
	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// END CODE PROVIDED BY SPRINGBOARD

		// inititalizing new Map for the words that the machine will generate
		let markov = new Map();

		// looping through the list of words defined in the constructor
		for (let i = 0; i < this.words.length; i += 1) {
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			// checking to see how to properly append the current word
			if (markov.has(word)) {
				markov.get(word).push(nextWord);
			} else {
				markov.set(word, [nextWord]);
			}
		}

		// setting the new markov variable
		this.markov = markov;
	}

	// generating a random choice from key values in the array passed in
	static random(arrayKeys) {
		return arrayKeys[Math.floor(Math.random() * arrayKeys.length)];
	}

	/** return random text from chains */
	makeText(numWords = 100) {
		// pick a random key to begin
		let keys = Array.from(this.markov.keys());
		let key = MarkovMachine.random(keys);
		let out = [];

		// produce markov chain until reaching termination word
		while (out.length < numWords && key !== null) {
			out.push(key);
			key = MarkovMachine.random(this.markov.get(key));
		}

		return out.join(' ');
	}
}

// exporting the class to use in other files
module.exports = {
	MarkovMachine,
};
