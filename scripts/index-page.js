// console.log("hello")

const comments = [
  {
    name: "Victor Pinto",
    timestamp: new Date(2023, 10, 2, 14, 30).getTime(),
    textComment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    avatarUrl: "",
  },
  {
    name: "Christina Cabrer",
    timestamp: new Date(2023, 9, 28, 16, 45).getTime(),
    textComment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day",
    avatarUrl: "",
  },
  {
    name: "Isaac Tadesse",
    timestamp: new Date(2023, 9, 20, 18, 15).getTime(),
    textComment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    avatarUrl: "",
  },
];

//timestamp
function timeAgo(timestamp) {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    if (secondsAgo < 60) {
      return "just now";
    } else if (secondsAgo < 3600) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hours = Math.floor(secondsAgo / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(secondsAgo / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
}
//comments
function createComment(name, timestamp, textComment, avatarUrl) {
  const commentSectionDiv = document.createElement("div");
  commentSectionDiv.className = "comment-list__section";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "comment-list__avatar";

  const avatarImg = document.createElement("img");
  avatarImg.className = "comment-list__avatar--img";
  avatarImg.src = avatarUrl || " ";

  if (!avatarUrl) {
    avatarImg.style.backgroundColor = "$primary-color-2";
  }

  avatarDiv.appendChild(avatarImg);

  const commentDetailsDiv = document.createElement("div");
  commentDetailsDiv.className = "comment-list__details";

  const commentInfoDiv = document.createElement("div");
  commentInfoDiv.className = "comment-list__info";

  const nameEli = document.createElement("p");
  nameEli.className = "comment-list__info--name";
  nameEli.textContent = name;

  const dateEli = document.createElement("p");
  dateEli.className = "comment-list__info--date";
  dateEli.textContent = timeAgo(timestamp);

  const commentDescriptionDiv = document.createElement("div");
  commentDescriptionDiv.className = "comment-list__description";

  const textCommentEli = document.createElement("p");
  textCommentEli.className = "comment-list__details--text";
  textCommentEli.textContent = textComment;

  commentInfoDiv.appendChild(nameEli);
  commentInfoDiv.appendChild(dateEli);
  commentDescriptionDiv.appendChild(textCommentEli);

  commentSectionDiv.appendChild(avatarDiv);
  commentDetailsDiv.appendChild(commentInfoDiv);
  commentDetailsDiv.appendChild(commentDescriptionDiv);
  commentSectionDiv.appendChild(commentDetailsDiv);

  document.querySelector(".comment-list").appendChild(commentSectionDiv);

  console.log(commentSectionDiv);
}

function renderComments() {
  const commentList = document.querySelector(".comment-list");
  commentList.innerHTML = "";
  comments.forEach((comment) => {
    createComment(
      comment.name,
      comment.timestamp,
      comment.textComment,
      comment.avatarUrl
    );
  });
}

renderComments();
//new comment with form validation
document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const currentTimestamp = Date.now();

    clearErrorState(nameInput);
    clearErrorState(commentInput);

    let isValid = true;

    if (nameInput.value.trim() === "") {
      setErrorState(nameInput, "Name cannot be empty");
      isValid = false;
    }
    if (commentInput.value.trim() === "") {
      setErrorState(commentInput, "Comment cannot be empty");
      isValid = false;
    }

    if (isValid) {
      const newComment = {
        name: nameInput.value,
        timestamp: currentTimestamp,
        textComment: commentInput.value,
        avatarUrl: "",
      };

      comments.unshift(newComment);

      //clearing the form feild
      nameInput.value = "";
      commentInput.value = "";

      renderComments();
    }
  });
//setting error state
function setErrorState(inputElement) {
  inputElement.classList.add("comments__input--error");
}

//clear error state
function clearErrorState(inputElement) {
  inputElement.classList.remove("comments__input--error");
}