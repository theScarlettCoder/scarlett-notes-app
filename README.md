# scarlett-notes-app

### Intro
Hello there, I see you found my simple project. I appreciate you for taking interest in my simple project.
My name is Egbadon Jeffrey aka theScarlettCoder. I am fascinated by the way things work on computers, thus, I learned about the creative, technical and thoughts processes involved in building stuff on computers.

This is just a simple M.E.R.N Stack notes app, that I decided to build in my journey to mastering the front-end and learning the backend of things, I have alot to learn, but, I am highly motivated and I hope my humble project motivates you too to do greater things and help others too.
Again welcome to my project. 

### Description
The Scarlett-notes-app like I wrote before, this is a simple M.E.R.N Stack app. By M.E.R.N, I mean:

1. M- MongoDB (Database)
2. E- Express (NodeJS Framework- a backend technology)
3. R- React (A javascript Framework- a frontend technology)
4. N- Node (A backend web technology)

I started this app primarily to test my knowledge of building whole apps independent of tutorials, along the way, I got hooked and I found myself making designs and making research on how to make it look good. Then, I thought to myself. I have learnt a couple things from tutorials, why not save my data to a real data-base and host it. That spark gave birth to this simple yet, in my eyes, glorious app.

In this app, when the homepage loads up, you see a bunch of notes written by you and the ones written by others. On the unauthenticated page (When you haven't logged in) you see details as:

(on the left side)
- Scarlett header 

(on the left side)
- Home navigation button 
- Log in navigation button
- sign up navigation button

The body holds the notes and displays them in colors based on the priority selected at the time of creation. The colors are as follows:

> Nero (#1C1C1C) => The primary color of the website Header and Footer (high priority notes on the homepage) 
> Shade of orange #d58128 => The color for low priority notes
> Sunset orange #ff5251 => The color for single page high priority notes
> Dodger Blue #006cff => The color for medium priority notes
> Ash => The color for grayed out notes, to show they have been completed

Then there's the footer, this part shows the year I started the project and my chosen alias ```Scarlett```.

You click and go into any of the notes to see details like: 

- Title
- Note Priority
- Date created
- Last date updated
- Name of author
- Mark as completed (that is if you are the post author)
- A tab to switch between Edit mode and View mode
- A profile circle containing the initials of the note author.


### What the app could be used for ?

1. For sharing ideas amongst a community of like minds and gaining some insight from others too.
2. For sharing poems and short experiences.
3. For accountability, knowing that others see your posts and you see notes of others. It creates a sense of accountability to working towards your set goals
4. For social clarity, in hope that people may one day share their thoughts on this app, users may get a sense of belonging and not feeling alone in their thoughts while reading thoughts from others or seeing thoughts that relate to you.



### Technologies used

1. React: JavaScript library
2. Express: Node framework
3. Node: Node framework
4. Axios: (for fetching and sending data - Communicating with apis and servers)
5. Date-fns: (for formatting of timestamps and date)
6. React-icons: (for pre-designed icons)
7. React-masonry-css: (for the masonry design structure)
8. sass: (for compiling scss to css)
9. bcryptjs: (for has passwords normally) 
   > I learnt to use bcrypt, but, it wasn't based on JavaScript so, I couldn't host it on heruko. so I saw an alternative.



### Challenges faced 

1. I ran into a-lot of errors while trying to get the backend to work

    > I encountered an error relating to cors and I solved it by installing
    > I encountered a cors error and had to install cors
    > I encountered a proxy issue where the api was routing from the localhost of my react app instead of my api, I solved it by creating a config folder         and an api file. Where i used axios instance to fix it

2. I had a-lot of issues implementing some functions.

    > I had issues managing state, so I had to use react context to manage certain state of the app and manage synchronization of the react app and             database.


## Future Implementations

1. A profile page where you can change details of you account.
2. A commenting and liking system so users can like and comment on the notes of others 
3. A system of filtering users and showing content based on what you want to see.


## How to Install And Run the Project

- cd into the folder you want to clone the project to.
    ```$ mkdir scarlett-notes-clone```
    ```cd scarlett-notes-clone```

- git clone the project into your folder by running the below with the link from the project about
    ```git clone https://git:link.git}```  

- cd into the client and api respectively and install the dependencies by running
    ```npm install``` or ```yarn install ``` respectively.

- start the applications and make changes  in areas you deem neccessary.


Thank you for your time.
Do reach out, I would love to read from you.

> No man is an Island, I love to connect and learn everyday.



