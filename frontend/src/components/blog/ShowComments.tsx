import React from "react";
// import { CommentedAt } from "../../utils/Time";
import { useCommentsQuery } from "../../services/queries";

type Props = {
  blogId: string;
};

const ShowComments = ({ blogId }: Props): React.ReactNode => {
  const {
    data: commentData,
    isPending: commentsLoading,
    isError,
    error,
  } = useCommentsQuery(blogId);

  if (commentsLoading) return <p>Comments Loading...</p>;

  if (isError) {
    console.log(error.message);
    return 0;
  }

  if (commentData?.data) {
    const blogComments = commentData?.data?.comments;
    return (
      <React.Fragment>
        {blogComments?.length > 0 ? (
          <div className="mt-10">
            <h3>Comments</h3>
            <ul>
              {blogComments?.map((comment) => (
                <li key={comment?._id}>
                  <h4>
                    {comment?.name.toUpperCase()} commented -{" "}
                    {/* <span>{CommentedAt(comment.createdAt)}</span> */}
                  </h4>

                  <p>comment: {comment?.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
};

export default ShowComments;
