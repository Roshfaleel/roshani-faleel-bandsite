// console.log("hello")

const comments = [
  {
    name: "Victor Pinto",
    date: "11/02/2023",
    textComment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    avatarUrl: "",
  },
  {
    name: "Christina Cabrer",
    date: "10/28/2023",
    textComment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day",
    avatarUrl: "",
  },
  {
    name: "Isaac Tadesse",
    date: "10/20/2023",
    textComment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    avatarUrl: "",
  },
];

function createComment(name, date, textComment, avatarUrl) {
  const commentSectionDiv = document.createElement("div");
  commentSectionDiv.className = "comment__section";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "comment__avatar";

  const avatarImg = document.createElement("img");
  avatarImg.className = "comment__avatar--img";
  avatarImg.src = avatarUrl || " ";

  if (!avatarUrl) {
    avatarImg.style.backgroundColor = "$primary-color-2";
  }

  avatarDiv.appendChild(avatarImg);

  const commentDetailsDiv = document.createElement("div");
  commentDetailsDiv.className = "comment__details";

   const commentInfoDiv = document.createElement("div");
   commentInfoDiv.className = "comment__info";

  const nameEli = document.createElement("p");
  nameEli.className = "comments__info--name";
  nameEli.textContent = name;

  const dateEli = document.createElement("p");
  dateEli.className = "comments__info--date";
  dateEli.textContent = date;

  const commentDescriptionDiv = document.createElement("div");
  commentDescriptionDiv.className = "comment__description";

  const textCommentEli = document.createElement("p");
  textCommentEli.className = "comments__details--text";
  textCommentEli.textContent = textComment;

  commentInfoDiv.appendChild(nameEli);
  commentInfoDiv.appendChild(dateEli);
  commentDescriptionDiv.appendChild(textCommentEli);

    commentSectionDiv.appendChild(avatarDiv);
    commentDetailsDiv.appendChild(commentInfoDiv);
  commentDetailsDiv.appendChild(commentDescriptionDiv);
  commentSectionDiv.appendChild(commentDetailsDiv);

  document.querySelector(".comment").appendChild(commentSectionDiv);

  console.log(commentSectionDiv);
}

comments.forEach((comment) => {
  createComment(
    comment.name,
    comment.date,
    comment.textComment,
    comment.avatarUrl
  );
});

