//USING API
//using bandsite API class

const apiKey = "8a658617-935c-48e4-9ff3-129aeac3fbe0";
const api = new BandsiteApi(apiKey);

async function renderComments() {
  const commentList = document.querySelector(".comment-list");
  commentList.innerHTML = "";

  try {
    const comments = await api.getComments();

    comments.forEach((comment) => {
      createComment(
        comment.name,
        comment.timestamp,
        comment.comment,
        comment.avatarUrl,
        comment.id,
        comment.likes
      );
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
renderComments();

//timestamp
function timeAgo(timestamp) {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  const minutes = 60; // 60 seconds
  const hours = minutes * 60; // 3600 seconds
  const days = hours * 24; // 86400 seconds
  const months = days * 30; // Approximation: 30 days
  const years = days * 365; // Approximation: 365 days

  if (secondsAgo < minutes) {
    return "just now";
  } else if (secondsAgo < hours) {
    const minsAgo = Math.floor(secondsAgo / minutes);
    return `${minsAgo} minute${minsAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < days) {
    const hrsAgo = Math.floor(secondsAgo / hours);
    return `${hrsAgo} hour${hrsAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < months) {
    const daysAgo = Math.floor(secondsAgo / days);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < years) {
    const monthsAgo = Math.floor(secondsAgo / months);
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / years);
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}

//comments
function createComment(
  name,
  timestamp,
  textComment,
  avatarUrl,
  commentId,
  likes = 0
) {
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

  const commentLikesDiv = document.createElement("div");
  commentLikesDiv.className = "comment-list__like-section";

  const commentLike = document.createElement("p");
  commentLike.textContent = `Likes: ${likes}`;

  const likeButton = document.createElement("button");
  likeButton.classList = "comment-list__like-button";
  likeButton.setAttribute("data-id", commentId);

  const deleteButton = document.createElement("button");
  deleteButton.classList = "comment-list__delete-button";
  deleteButton.setAttribute("data-id", commentId);

  commentInfoDiv.appendChild(nameEli);
  commentInfoDiv.appendChild(dateEli);
  commentDescriptionDiv.appendChild(textCommentEli);
  commentLikesDiv.appendChild(commentLike);
  commentLikesDiv.appendChild(likeButton);
  commentLikesDiv.appendChild(deleteButton);

  commentSectionDiv.appendChild(avatarDiv);
  commentDetailsDiv.appendChild(commentInfoDiv);
  commentDetailsDiv.appendChild(commentDescriptionDiv);
  commentDetailsDiv.appendChild(commentLikesDiv);
  commentSectionDiv.appendChild(commentDetailsDiv);

  likeButton.addEventListener("click", async (event) => {
    const commentId = event.target.getAttribute("data-id");
    try {
      const updatedComment = await api.likeComment(commentId);
      commentLike.textContent = `Likes : ${updatedComment.likes}`;
    } catch (error) {
      console.error("Error liking comment : ", error);
    }
  });

  deleteButton.addEventListener("click", async (event) => {
    const commentId = event.target.getAttribute("data-id");
    if (commentId) {
      try {
        await api.deleteComment(commentId);
        commentSectionDiv.remove();
      } catch (error) {
        console.error("Error deleting comment : ", error);
      }
    }
  });

  document.querySelector(".comment-list").appendChild(commentSectionDiv);

  console.log(commentSectionDiv);
}

document
  .getElementById("comment-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");

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
        comment: commentInput.value,
      };
      try {
        await api.postComment(newComment);
        //clearing the form feild
        nameInput.value = "";
        commentInput.value = "";

        renderComments();
      } catch (error) {
        console.error("Error posting comment : ", error);
      }
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
