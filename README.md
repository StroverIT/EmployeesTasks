This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
# or
yarn
yarn dev
```

create .env.local file and inside it write
DB_HOST=mongodb://127.0.0.1:27017/nameOfTheDB

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If the port is taken, automaticaly is going to the next port, which is 3001

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Technologies

1. NextJs
2. TailwindCSS
3. Toastify
4. Framer motions 
5. react-chartjs-2
6. Mongoose

*Note: Didn't have enough time to show my framer motions skills :(

### Folder structure overview
    .
    ├── .next                   # Static files, generated with npm run build. This folder is for deployment usage
    ├── components              # Test files (alternatively `spec` or `tests`)
    │   ├── layouts             # Navigation, footer and main page
    │   └── ...                 # Everything else is self explained                          
    ├── data                    
    │   └── index               
    │         └── Inputs        # Getting inputs data like types, names, labels, placeholders etc.
    ├── db
    │   ├── models
    │   │     ├── Employee      # Mongoose model schema
    │   │     └── Task          # Mongoose model schema
    │   └── connectDb           # Function to connect with db server
    ├── libs   
    │   └── Notifications       # Pre-made functions for Toastify notifications 
    ├── pages                   # Everything except api is a "view route". Example pages/index.js = / ; pages/account/index.js = /account
    │   └──api                  # API calls to the back-end
    ├── public                  # Static files like images
    ├── styles                  # Mostly used for global.css and to setup a tailwindcss
    └── utils                   # Creating functions that are reausable or easy API Calls
        ├── employee            # Used for API calls to employee API folder
        ├── task                # Used for API calls to taks API folder
        ├── errorHandler        # Error handlers
        └── helper              # Ssed for reusable code like format date, percentages, currency, setInputHandler etc.
        
    
## Additional functionalities 

1. TOP 5 statistic for the year - Most hardworking one is showing on the statistic, where every month is showing his/her monthly completed tasks
2. On edit, can give the task to another employee - Let's say I am junior and was brave and took more than I can, and now I need help, this is perfect for someone to give me a hand

