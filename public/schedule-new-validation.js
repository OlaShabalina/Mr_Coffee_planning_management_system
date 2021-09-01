const createScheduleForm = document.querySelector('#create-schedule');

// Only need validation for the time

const startTime = document.querySelector("#start_at")
const endTime = document.querySelector("#end_at");

createScheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const startTimeArray = startTime.value.split(':');
    const endTimeArray2 = endTime.value.split(':');

    if (startTimeArray[0] < endTimeArray2[0]) {
        createScheduleForm.submit();
    } else {
        endTime.classList.add('btn-danger');
    }
})

