let obj = {

    first_name: "Damon",
    last_name: "Buchholz",

    sayHello() {
        console.log("Hello " + this.first_name + " " + this.last_name)
    }
}

sayHello();