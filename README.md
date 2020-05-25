# Broccoli & Co Landing Page

A Code Challenge solution by Matt Bell. This is in a draft state, pending some more work.

## tl;dr

* It's written in React using Create React App, Redux, Styled Components, and Formik.
* UI is mostly done using the wonderful Semantic UI (React bindings)
* Clone the repo, `npm install` and `npm start` to make it run.
* `npm test` to watch the tests run
* This readme contains further ramblings on considerations taken during implementation
* You can see it running in the Cloud at https://master.d27dqm222h0ug5.amplifyapp.com


## Introduction

Thank you for the opportunity to apply for this role. The above will get you started with running the app and having a play. Everything below goes into more detail around some of the choices made and motivations.


## Overall Principles

* Try to maintain elegance but not over-engineer
* Use some patterns I'm comfortable with, while trying some new stuff.
* Make it look good and work well, irrespective of device.
* Provide a nice variety (read: Cross-section) of tests (Unit)
* Deployed to the cloud is good!


## Things done

At a high-level, this is how the work unfolded:

* Bootstrapped the app using CRA
* Started building the barebones compoennts representing parts of the UI
* Brought in Semantic UI, styled-components and started making it look the goods
* Brought in react and scaffolded actions and reducer to handle form submission and modal visibility
* Created API wrapper service
* Build modal and form, connecting state layers.



## Considerations

Here, I go into a few topics and talk through the thinking behind each.

### Use of Redux

Despite the relative simplicity of the requirements, I decided to use redux as it afforded a good amount of flexibility to extend the functionality if required (further API calls, etc). Because there's not a complicated chain of events, I decided against saga's as the additional power would have been lost on this use case.

You'll note I've used multiple state containers, one decorating the Modal itself and the other decorating the Splash component. This approach gives us the flexibility to potentially have multiple triggers for opening the modal in different parts of the UI. (I use the approach to trigger the Feedback modal on Sixagonal.com)

There's nothing fancy like selectors to speak of here.


### Styled-Components

I've historically used the CSS in separate files shebang and thought this was a good opportunity to find a better way. I have the styled-components library a go and by golly, I think I've found my new go to!

One thing that stood out was the ability to not only define the elements to be styled using the libraries base types, but also being able to augment the styles of other components (like those from Semantic UI) is a massive plus. Being able to over-ride specificity of existing styles through the use of `&&& { }` made a huge difference.


### Formik

Before, I've used Redux Forms for managing form input but hated the fact that it called actions on the store used in the rest of the app for EVERY DAMNED KEYSTROKE. Aside from the fact that it definitely solves this problem, it's also really simple to wire up and build in things like validation.

What hasn't been simple, and what I ran out of time to fix is a console log error, caused by Semantic UI attempting to automagically pass a prop to the Formik Field component and bouncing off the type-checking. These will popup when running the app in dev, and when you run the tests.


### Axios over Fetch

I could have used fetch instead of Axios. One reason I like axios is the ability to create instances of it and configure default headers and base urls. This makes environment-specific config a lot easier without having to repetitively interpolate the information it into every distinct call method.


### Semantic UI

If you've come across a more comprehensive and thought-out UI libary, complete with React Bindings, I'd like to know. The Semantic UI Modal is a great component that works well and handles mobile well.


### AWS Amplify CI/CD

This is the greatest thing I've discovered this year. Amplify can be connected to a Github repo and easily configured to build, test and deploy your React app to one or more environments, scaffolding all of the AWS resources required. The container that builds and runs the tests, the S3 bucket and Cloudront distribution that hosts it, even the certificates to ensure it is served via HTTPS.

Environments can be configured for different branches and short-lived preview environments can be set up for things like feature branches.  Honestly, it is way too easy to be a developer these days!


## Things I could have done better

Life is too short to sweat every single detail and often-times, shipped is better than perfect. Here's the compromises I made throughout.


### It's pretty heavy

1mb+ for a landing page is a bit rich. Realistically, avoiding Semantic UI and the Font-awesome icons would have dropped the size somewhat. Not having a background image, or heavily optimising it would make it lighter still.


### Structure could have been tighter

Components could have been categorised more specifically and the Redux parts could have been expressed as ducks. I chose not to tackle these at this stage, deferring improvements to when the Broccoli & Co founders decide they are ready to go for a bit more website. :)


### Separate Config file

Typically, what I do for this is have a config.js in source that maps environment vars (`REACT_APP_BASEURL`) to keys in the object. Webpack swaps these out at build time. Config is imported where needed. Because I use AWS Amplify to deploy my apps, I am able to set the env vars there for each environment. For running local, I use a `local.env` file.

Config items in source files is wickity-whack. Config in repos is less wickity-whack but still whack.


### Could have done some E2E tests

Yerp. I didn't do any. No Cypress up in here. Relying on unit tests along is not my favorite thing in the world. I might add these in after submission. I'm keen to see how they work on Amplify.
