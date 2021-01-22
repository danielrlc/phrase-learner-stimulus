# Project documentation

---
title: tec-stimulus
starting date: 2021-01-20
tags: #stimulus, #tailwind, #hotwire
---

## Introduction

I built this app to demo my frontend skills for a potential employer. This document reflects that, as it shows my approach to building an app like this, and the reasons why I made the decisions I did.

## UX notes

## Tech stack notes

### Why Stimulus?

After [listening to Ruby on Rails creator DHH](https://fullstackradio.com/151) introducing [Hotwire](https://hotwire.dev/) on a recent podcast, I wanted to try it out, especially as I have recently started learning Ruby and Ruby on Rails, which Hotwire is designed to integrate smoothly with.

Hotwire has a few parts to it, so I decided – as a frontend developer – to start with the most familiar-looking JavaScripty part of it, which is [Stimulus](https://stimulus.hotwire.dev/).

Stimulus is described on its website as being:

'A modest JavaScript framework for the HTML you already have.'

In other words, it is designed to pair well with server-rendered HTML sent "over the wire" (from server to client) by a fullstack framework like Rails or Laravel.

As a new JavaScript framework seems to appear every 5 minutes or so, it's important to be discriminating when picking a new framework to learn. Stimulus is an excellent choice, because it's been created by people with a fantastic 15+-year track record in open source software. It's also being used in at least one [large-scale production app: Basecamp](https://basecamp.com/).

I was also attracted to Stimulus because it can be used without needing to be built first. This meant I could get started with Stimulus by just adding this script tag to my HTML:

```html
<script src="https://unpkg.com/stimulus/dist/stimulus.umd.js"></script>
```

Of course Stimulus can also be used with a build tool like webpack, but it was great to be able to defer doing that when getting started with the framework. (This is one of the reasons VueJS originally appealed to me more than React.)

### Why Tailwind CSS?

Because it's awesome.

But if that didn't convince you, here are some reasons why Tailwind is an excellent CSS framework:

- It helps you avoid [specificity wars](https://csswizardry.com/2014/10/the-specificity-graph/) in your CSS.
- It helps you avoid [premature abstraction](https://tailwindcss.com/docs/extracting-components).
- It takes away naming headaches, by naming almost everything for you.
- And several more reasons...

## Code formatting

I used [Prettier](https://prettier.io/) to format my code, and configured it in an `.prettierrc` file to remove semicolons from the end of statements in JavaScript. This follows the convention used in the Stimulus documentation.

## Some code refactorings

I refactored this line:

```javascript
this.buildText(false)
```

into this:

```javascript
this.showOrHideAllWords(this.HIDE_ALL_WORDS)
```
