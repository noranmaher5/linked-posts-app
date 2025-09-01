import React from "react";
import UpdateComment from "../UpdateComment/UpdateComment";

const Comment = ({ comment, refreshComments }) => {
  const photoUrl =
    comment.commentCreator?.photo &&
    comment.commentCreator.photo !== "undefined"
      ? comment.commentCreator.photo.startsWith("http")
        ? comment.commentCreator.photo
        : `https://linked-posts.routemisr.com/${comment.commentCreator.photo}`
      : "/default-avatar.png";

  return (
    <div className="flex items-start gap-3 p-2 border-b border-gray-200">
      <img
        src={photoUrl}
        alt={comment.commentCreator?.name || "User"}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <h4 className="font-semibold">{comment.commentCreator?.name}</h4>
        <p className="text-gray-700">{comment.content}</p>
        <span className="text-xs text-gray-400 block">
          {new Date(comment.createdAt).toLocaleString()}

        </span>

        {/* 👇 الأزرار بتاعت Edit/Delete */}
        <UpdateComment comment={comment} refreshComments={refreshComments} />
      </div>
    </div>
  );
};

export default Comment;
