# 31.5 Markov Machine
An algorithm for generating realistic machine-made text from an original source text. A Markov Machine emits output of a “Markov Chain.” A Markov Chain is a chain of possible outcomes, given a particular “state”.

This Machine allows you to read in a text file or pass in a URL, as you can see in the following examples:

```
$ node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...

$ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...
```

## Setup
1. Download source files
2. Run npm -install
3. Run node commands in terminal

## Testing
There is also some tests included which can be run with Jest by running the following command:

`jest markov.test.js`
