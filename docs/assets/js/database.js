
const example_db = {
    "version": 1,
    "type": "docs",
    "database": {
        "docs": [
            {
                "id": "example",
                "name": "Example Document",
                "time": Date.now(),
                "content": [
                    "<h1>Hello World!</h1>",
                    "<p>This is example text</p>",
                    "<p style=\"color: red;\">This is some red text</p>"
                ]
            }
        ],
        "settings": {
            "locale": "en",
        },
    },
};

var db = {

};

function loadDB() {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("database") == null) {
            localStorage.setItem("database", JSON.stringify(example_db));
            db = JSON.parse(localStorage.getItem("database"));
        }
        else 
            db = JSON.parse(localStorage.getItem("database"));
    
        console.log("[Database] Database Loaded");
    } else {
        showError("No local storage support found!\nTry using a different browser!");
    }
}

function saveDB() {
    localStorage.setItem("database", JSON.stringify(db));
    console.log("[Database] Database Saved");
}

function getDocById(id) {
    let ele = undefined;

    try {
        db.database.docs.forEach(element => {
            if(element.id == id) {
                ele = element;
            }
        });
    }
    catch (error) {
        console.error(error);
    }

    return ele;
}

loadDB();
