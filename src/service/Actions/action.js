// action to add a new question in the store
const addQ = (qTitle, qDesc, qQuestions) => 
{
    // creating the date & time contents for timestamp
    const date = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hr = date.getHours();
    let ampm = "AM";
    let mins = date.getMinutes();
    if (mins < 10) 
    {
        mins = '0' + mins;
    }
    if (hr > 12) 
    {
        hr -= 12;
        ampm = "PM";
    }
    // creating the timestamp by adding its contents
    const curDate = date.getDate() + ' ' + months[date.getMonth()] + ", " + hr + ":" + mins + " " + ampm;
    // returning the ADD_Q action object
    return {
        type: "ADD_Q",
        payload: {
            title: qTitle,
            desc: qDesc,
            que: qQuestions,
            status: true,
            date: curDate
        },
    }
}
//action to toggle the status between ACTIVE & INACTIVE in the store
const toggleStatus = (stat, i) => {
    // returning the TGL_STAT action object with new status and the quiz index
    return {
        type: "TGL_STAT",
        payload: {
            status: stat,
            index: i
        },
    }
}
//action to delete a question from the store
const dltQ = (i) => {
    // returning the DLT_Q action object with payload as the index of Quiz to delete
    return {
        type: "DLT_Q",
        payload: i,
    }
}

//action to edit/update a question of the store
const editQ = (qTitle, qDesc, qQuestions, id) => {
    const date = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hr = date.getHours();
    let ampm = "AM";
    let mins = date.getMinutes();
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (hr > 12) {
        hr -= 12;
        ampm = "PM";
    }
    // updating the timestamp with current date & time
    const curDate = date.getDate() + ' ' + months[date.getMonth()] + ", " + hr + ":" + mins + " " + ampm;
    
    // returning the EDIT_Q action object
    return {
        type: "EDIT_Q",
        payload: {
            title: qTitle,
            desc: qDesc,
            que: qQuestions,
            status: true,
            date: curDate
        },
        editId: id,
    }
}

//  exporting all the actions
export { addQ, toggleStatus, dltQ, editQ }; 