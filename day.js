



exports.printDay = () => {
    let today = new Date();
    

    let options = {
      weekday : 'long',
      day: 'numeric',
      month: 'long'
    }
    today = today.toLocaleDateString('en-US',options)
    return today
}

console.log(module.exports)