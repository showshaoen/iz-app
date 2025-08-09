$(document).ready(async () => {
  let data = {};
  // data = await ajaxRequest("GET", `/getDaily/daily/20220823`, {});
  // console.log(data);

  $("#scheduleForm").on("submit", async (e) => {
    e.preventDefault();
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

    console.log(`${data}`);

    let $body = $("#contentDisplay");
    let builder = "";

    if (type == "daily") {
      for (let i = 0; i < data.content.length; i++) {
        let cardBody = "";
        if (data.content.length > 1) {
          cardBody += `${data.title} (${i + 1}/${data.content.length})\n`;
        } else {
          cardBody += `${data.title}\n`;
        }
        cardBody += data.header;
        cardBody += `${data.content[i]}`;

        builder += await cardBuilder("Daily Tweet", cardBody);
      }
    } else if (type == "reminder") {
      builder += `<h5 class="text-center mb-3">Reminders: ${data.content.length}</h5>`;
      for (x of data.content) {
        if (!("scheduleTime" in x)) continue;
        builder += await cardBuilder(x.scheduleTime, x.reminder);
        // builder += x;
      }
    } else if (type == "tweetDaily") {
      builder += await cardBuilder("Tweeted succesfully!", data);
    }

    $body.html(builder);

    // Clipboard
    var clipboard = new ClipboardJS(".clipboard", {
      text: function (trigger) {
        return trigger.previousSibling.innerText;
      },
    });

    clipboard.on("success", function (e) {
      let icon = `<i class="fa-regular fa-copy pe-2"></i>`;
      let copied = icon + "Copied!";
      $(e.trigger).removeClass("btn-info");
      $(e.trigger).addClass("btn-secondary");
      $(e.trigger).html(copied);
      setTimeout(() => {
        $(e.trigger).removeClass("btn-secondary");
        $(e.trigger).addClass("btn-info");
        $(e.trigger).html(icon + "Copy to clipboard");
      }, 1000);
    });

    clipboard.on("error", function (e) {
      console.log("Failed!");
    });

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

async function cardBuilder(cardHeader, cardBody) {
  let cardBodyHTML = cardBody.replace(/(?:\r\n|\r|\n)/g, "<br>");
  let builder = "";
  // builder += `<div class="col-lg-6">`
  builder += `<div class="card mb-3">`;
  builder += `<div class="card-header">${cardHeader}</div>`;
  builder += `<div class="card-body">`;
  builder += cardBodyHTML;
  builder += `<span hidden>${cardBody}</span>`;
  builder += `<button type="button" class="btn btn-info mt-2 clipboard">`;
  builder += `<i class="fa-regular fa-copy pe-2"></i>Copy to clipboard`;
  builder += `</button>`;
  builder += `</div>`;
  // builder += `</div>`;
  builder += `</div>`;

  return builder;
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
