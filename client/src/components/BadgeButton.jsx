import React from "react";
import { updateUser } from "../helpers/api/lingapp/users";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IconComponent = ({ icon: Icon, className }) => {
  return <Icon className={className} />;
};

const BadgeButton = ({
  name,
  description,
  count,
  medal,
  icon,
  refreshAchievements,
}) => {
  const { id } = useParams();
  const medalsDictionary = {
    bronze: { ceiling: 1, color: "bg-yellow-600" },
    silver: { ceiling: 2, color: "bg-gray-300" },
    gold: { ceiling: 3, color: "bg-amber-400" },
  };

  const ceiling = medalsDictionary[medal].ceiling;
  const isDisabled = count < ceiling ? true : false;

  const BUTTON_CLASS_NAME = `h-44 w-32 bg-yellow-50 flex flex-col items-center justify-center border rounded-lg relative my-5 border-4 border-red-900 ${
    count < ceiling ? "opacity-25" : ""
  }`;

  const handleOnClick = async () => {
    const response = await updateUser({ id, badge_title: name });
    console.log(response);
    if (response.status === 200) {
      await refreshAchievements();
      toast.success(`Activated "${name.toUpperCase()}" badge!`);
    } else {
      toast.error(response);
    }
  };

  return (
    <button
      className={BUTTON_CLASS_NAME}
      disabled={isDisabled}
      onClick={handleOnClick}
    >
      <IconComponent
        icon={icon}
        className={`h-20 w-20 ${medalsDictionary[medal].color} mt-2 text-gray-800 p-2 rounded-full border-4 border-red-900 absolute -top-10 outline-white`}
      />
      <span className={`mt-8 font-bold text-red-600 text-xs`}>{name}</span>
      <span className="mt-2 italic text-gray-700 text-xs">{description}</span>
      <span className="text-gray-500 text-xs font-bold absolute bottom-2 right-2">
        {count}/{ceiling}
      </span>
    </button>
  );
};

export default BadgeButton;
