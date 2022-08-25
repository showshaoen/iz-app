$(document).ready(async () => {
  let data = {};
  // data = await ajaxRequest("GET", `/getDaily/daily/20220823`, {});
  // console.log(data);

  $("#scheduleForm").on("submit", async (e) => {
    e.preventDefault();
    console.log(e.target);
    let submitBtn = $(e.target).find("button[name=submitBtn]");
    submitBtn.prop("disabled", true);
    let loader = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    submitBtn.html(loader);
    const form = document.getElementById("scheduleForm");
    const formData = new FormData(form);

    let type = formData.get("type");
    let date = formData.get("date");

    var data = await ajaxRequest(
      "GET",
      `/calendar/getDaily/${type}/${date}`,
      {}
    );

    let $body = $("#contentTextArea");
    let builder = "";

    if (type == "daily") {
      for (let i = 0; i < data.content.length; i++) {
        if (data.content.length > 1) {
          builder += `${data.title} (${i + 1}/${data.content.length})\n`;
        } else {
          builder += `${data.title}\n`;
        }
        builder += data.header;
        builder += `${data.content[i]}\n`;
      }
    } else if (type == "reminder") {
      for (x of data.content) {
        builder += x;
      }
    }

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
