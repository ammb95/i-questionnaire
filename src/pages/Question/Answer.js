import { IconButton } from "@material-ui/core";
import { parseISO } from "date-fns";
import { format } from "date-fns/esm";
import React, { useMemo, useState } from "react";
import api from "../../api";
import CollapsibleRow from "../../components/CollapsibleRow";

export default function Answer({ _id, author, body, created_at, likes }) {
  const [likesCount, setLikesCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const createdAt = useMemo(
    () => format(parseISO(created_at), "dd/MM/yyyy"),
    [created_at]
  );

  const handleLike = async () => {
    setLikesCount((prev) => prev + 1);
    setLiked(true);

    try {
      await api.patch(`answers/${_id}/like`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollapsibleRow
      className="bg-green-900 hover:bg-green-700"
      children={{
        Header: ({ ...props }) => (
          <div
            className="pl-8 py-4 font-semibold text-white cursor-default flex justify-between items-center"
            {...props}
          >
            <div>{author}</div>
            <div className="flex items-center">
              <div>{likesCount}</div>
              <div>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  className="outline-none"
                  disabled={liked}
                >
                  <i
                    className={`las la-heart ${liked ? "text-red-600" : ""}`}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        ),
        Toggler: ({ iconStyle, ...props }) => (
          <IconButton style={{ outline: "none" }} {...props}>
            <i className="las la-caret-down text-white" style={iconStyle} />
          </IconButton>
        ),
        Content: () => (
          <div className="px-8 pt-4 pb-8 bg-green-700 text-white">
            <div className="text-right mb-8 italic">{createdAt}</div>
            <div className="text-sm text-justify whitespace-pre-line break-words">
              {body}
            </div>
          </div>
        ),
      }}
    />
  );
}
