const { MarkovMachine } = require('./markov');

// grouping tests together in the describe callback
describe('Markov Machine Tests', function () {
	// verifying that creating a new string with the algorithm has the correct return
	test('makes new array from Markov Machine', function () {
		let mm = new MarkovMachine('aa bb cc aa BB aa BB');

		expect(mm.markov).toEqual(
			new Map([
				['aa', ['bb', 'BB', 'BB']],
				['bb', ['cc']],
				['cc', ['aa']],
				['BB', ['aa', null]],
			])
		);
	});

	// verify that picking certain choices from the array have the proper return
	test('passes array into the Markov Machine', function () {
		expect(MarkovMachine.random([3, 3])).toEqual(3);
		expect([4, 5, 7]).toContain(MarkovMachine.random([4, 5, 7]));
	});

	// verify that the Markov Machine is generating the predicted text
	test('generates text through the Markov Machine', function () {
		let mm = new MarkovMachine('D E F');
		let text = mm.makeText();
		expect(['D E F', 'E F', 'F']).toContain(text);
	});

	// verify that the machine generates valid text
	test('generates valid text through the Markov Machine', function () {
		let bigrams = ['the cat', 'cat in', 'in the', 'the hat', 'hat '];
		let mm = new MarkovMachine('the cat in the hat');
		let output = mm.makeText();
		expect(output.endsWith('hat')).toBe(true);

		let outputWords = mm.makeText().split(/[ \r\n]+/);

		for (let i = 0; i < outputWords.length - 1; i++) {
			expect(bigrams).toContain(
				outputWords[i] + ' ' + outputWords[i + 1]
			);
		}
	});

	// verify that the the MarkovMachine is cutting off at the proper length
	test('cuts off text from Markov Machine at a certain length', function () {
		let bigrams = ['the cat', 'cat in', 'in the', 'the hat', 'hat '];
		let mm = new MarkovMachine('the cat in the hat');
		let output = mm.makeText(2);

		let outputWords = output.split(/[ \r\n]+/);
		expect([1, 2]).toContain(outputWords.length);
	});
});
