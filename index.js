const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

// built in middleware
app.use(express.static('public'));

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// application-level middleware
app.use((req, res, next) => {
    console.log(`Request received at ${req.url}`);
    next();
});

const mahasiswa = [{
    name: "Zheeva Azizah",
    npm: 202443501671,
    email: "zheeva.azizah@gmail.com"
},
{
    name: "Adzashel Von Moreau",
    npm: 202443501704,
    email: "adzashel_dev@outlook.com"
},
{
    name: "Rene Florencia",
    npm: 202443501737,
    email: "reneflorencia@gmail.com"
},
{
    name: "Lorena Santiago",
    npm: 202443501770,
    email: "lorena.santiago@gmail.com"
}
]


const links = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "About",
        href: "/about"
    },
    {
        name: "Contact",
        href: "/contact"
    },
    {
        name: "API",
        href: "/api/"
    },
    {
        name: "Daftar Mahasiswa",
        href: "/mahasiswa"
    }
]

app.get('/', (req, res) => {
    res.render('index', {
        links,
        title: 'home page',
        layout: 'partials/container.ejs'
    });
});

app.use((req, res, next) => {
    console.log(`Time ${Date.now()}`);
    next();
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'partials/container',
        links
    })
});


app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        layout: 'partials/container',
        links
    });
});

app.get('/api/', (req, res) => {
    const data = [
        {
            name: "Freidrich Nietzsche",
            quote: "In Heaven , all interesting people are missing"
        },
        {
            name: "Socrates",
            quote: "Everything has a beginning, but not everything has a destination"
        }
    ]
    res.json(data);
});

app.get('/mahasiswa', (req, res) => {
    res.render('mahasiswa', {
        mahasiswa,
        links,
        title: "Daftar Mahasiswa",
        layout: 'partials/container'
    })
});

app.use((req, res) => {
    res.status(404);
    res.render('404', {
        layout: 'partials/failed',
        title: 'Page not found',
        links
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});