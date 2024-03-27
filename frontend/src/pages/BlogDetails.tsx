import React from "react";
import { useLocation } from "react-router-dom";
import { useBlogQuery } from "../services/queries";
// import { FormatTime } from "../utils/Time";

const BlogDetails: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { data: blogs, isPending, isError, error } = useBlogQuery(id);

  if (isPending) return "Blog Loading...";

  if (isError) {
    console.log(error.message);
    return 0;
  }

  if (blogs) {
    const result = blogs?.data;

    return (
      <section className="lg:px-30 md:px-24 sm:px-16 px-10 lg:py-10 py-10">
        <div>
          <h1 className="text-center text-5xl font-extrabold mb-16 py-4 md:py-16">
            {result?.title}
          </h1>
          <h5 className="text-gray-500">
            {/* Published: {FormatTime(result.createdAt)} */}
          </h5>
          <p className="mt-10 text-xl font-normal">{result?.body}</p>
        </div>
      </section>
    );
  }
};

export default BlogDetails;
