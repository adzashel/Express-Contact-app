const express = require('express');
const app = express();
const chalk = require('chalk');
const { renderContact,
    detailContact,
    addContact,
    checkDuplicate } = require('./utils/contacts');
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const { validationResult, check, body } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine', 'ejs');

// built in middleware
app.use(express.static('public')); // to show static files
app.use(express.urlencoded({ extended: true }));
// Third Party Middleware
app.use(expressLayouts);

// configure modules

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000, // 10 minutes
    }
}));

app.use(flash());



app.get('/', (req, res) => {
    res.render('index', {
        title: 'home page',
        layout: 'partials/container.ejs'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'partials/container',
    })
});


app.get('/contact', (req, res) => {
    const contacts = renderContact();
    res.render('contact', {
        title: 'Contact',
        layout: 'partials/container',
        contacts,
        message: req.flash('message')
    });
});

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Add Contact',
        layout: 'partials/container',
    });
});

app.post('/contact', [
    body('name').custom((value) => {
        const duplicate = checkDuplicate(value);
        if (duplicate) {
            throw new Error('Nama yang anda masukan sudah ada');
        }
        return true;
    }),
    check('email').isEmail().withMessage('Email anda tidak valid!'),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: 'Add Contact',
                layout: 'partials/container',
                errors: errors.array()
            })
        } else {
            addContact(req.body);
            req.flash('message', 'Data has already been added')
            console.log(chalk.bgBlue(`data ${req.body.name} added successfully`));
            res.redirect('/contact');
        }
    })

app.get('/contact/:name', (req, res) => {
    const detail = detailContact(req.params.name);
    res.render('detail', {
        title: 'Detail Contact',
        layout: 'partials/container',
        detail
    });
})

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
    const mahasiswa = renderContact();
    res.render('mahasiswa', {
        title: "Daftar Mahasiswa",
        layout: 'partials/container',
        mahasiswa
    })
});

app.use((req, res) => {
    res.status(404);
    res.render('404', {
        layout: 'partials/failed',
        title: 'Page not found',
    })
})

app.listen(port, () => {
    console.log(chalk.bgGreen(`Server is running at http://localhost:${port}`));
});