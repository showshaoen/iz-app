$(document).ready(async () => {
  $("#createScheduleForm").on("submit", async (e) => {
    e.preventDefault();
    let submitBtn = $(e.target).find("button[name=submitBtn]");
    submitBtn.prop("disabled", true);
    let loader = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    submitBtn.html(loader);

    let form = $("#createScheduleForm");

    // let response = await ajaxRequest(
    //   "POST",
    //   "/calendar/create",
    //   form.serialize()
    // );

    $.ajax({
      type: "POST",
      url: "/calendar/create",
      data: form.serialize(),
      cache: false,
      success: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(response);

    let $body = $("#newScheduleTextArea");
    let builder = "";

    $body.html(builder);
    submitBtn.prop("disabled", false);
    submitBtn.html("Submit");
    $("#scheduleForm").trigger("reset");
  });
});

async function getContent(input) {
  return $.ajax({
    type: "POST",
    url: "/schedules/getDaily",
    data: input,
    cache: false,
    success: (result) => {},
    error: (err) => {
      console.log(err);
    },
  });
}

async function ajaxRequest(method, url, data) {
  return $.ajax({
    type: method,
    url: url,
    data: data,
    cache: false,
    success: (result) => {},
    error: (err) => {
      console.log(err);
    },
  });
}
