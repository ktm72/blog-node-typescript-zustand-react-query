import React from "react";
import { Button, Card } from "keep-react";
import toast from "react-hot-toast";
import { IBlog } from "../../types/blog";
//icons
import { MdFavoriteBorder } from "react-icons/md";
import { FaAnglesRight } from "react-icons/fa6";
import { IFav, useStoreFav } from "../../store";
import { Link } from "react-router-dom";

interface Props {
  blog: IBlog;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const { addToFav } = useStoreFav();

  const addToFavorite = (id: string, title: string) => {
    const session: IFav[] | [] = JSON.parse(
      sessionStorage.getItem("favorite") || "[]"
    );
    if (session.length > 0) {
      const stored = session.some((fav) => fav.id === id);
      if (stored) {
        toast.error("Already Added.");
      } else {
        addToFav({ id, title });
        sessionStorage.setItem(
          "favorite",
          JSON.stringify([...session, { id, title }])
        );
        toast.success("Added To Favorite.");
      }
    } else {
      addToFav({ id, title });
      sessionStorage.setItem("favorite", JSON.stringify([{ id, title }]));
      toast.success("Added To Favorite.");
    }
  };
  return (
    <React.Fragment>
      <Card className="p-6 w-full">
        <Card.Container className="flex items-start md:gap-5 gap-3.5">
          <Card.Container className="flex flex-col gap-2">
            <div className="flex justify-between gap-1">
              <Link to={`/blog/${blog._id}`}>
                <Card.Title>{blog.title}</Card.Title>
              </Link>
              <Button
                onClick={() => addToFavorite(blog._id, blog.title)}
                size="sm"
                type="outlineGray"
              >
                <span>
                  <MdFavoriteBorder size={16} color="#444" />
                </span>
              </Button>
            </div>
            <Card.Description>
              {blog.body.substring(0, 150)} ...
            </Card.Description>

            <Link to={`/blog/${blog._id}`}>
              <Button type="default" size="xs">
                <span className="pr-2">
                  <FaAnglesRight size={14} />
                </span>
                Read More
              </Button>
            </Link>
          </Card.Container>
        </Card.Container>
      </Card>
    </React.Fragment>
  );
};

export default BlogCard;
