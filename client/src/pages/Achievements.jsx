import React, { useState, useEffect } from "react";
import { getAchievements } from "../helpers/api/lingapp/users";
import { useParams } from "react-router-dom";
import { BadgeButton } from "../components";
import { FaPaw, FaGraduationCap, FaLeaf } from "react-icons/fa";
import { GiEarthAfricaEurope, GiFireExtinguisher } from "react-icons/gi";
import { MdLocalHospital } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

const Achievements = () => {
  const { id } = useParams();
  const [achievements, setAchievements] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAchievements(id);
      console.log(response.data);
      setAchievements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalAchievements = (categories) => {
    return categories.reduce((total, count) => {
      return total + count;
    });
  };

  return (
    <div className="h-max w-full overflow-x-hidden pt-1 pb-24 bg-red-300 flex flex-col items-center md:w-2/5">
      <div className="h-32 w-full p-6 bg-red-900 flex flex-col items-center justify-center mb-1 border-y-4 border-yellow-400">
        <span className="text-white text-4xl font-bold text-center mb-1">
          {achievements.first_name} {achievements.last_name}
        </span>
        <span className="font-extrabold text-yellow-500 text-md -my-2 tracking-wide">
          {achievements?.badge_title?.toUpperCase()}
        </span>
      </div>

      <span className="bg-red-200 w-full text-center text-red-900 pt-2 text-sm font-bold">
        Collected{" "}
        {achievements.categories
          ? totalAchievements(Object.values(achievements.categories))
          : 0}{" "}
        of 21
      </span>

      <div className="h-max w-full md:w-full bg-red-200 grid grid-cols-3 gap-2 place-items-center py-10 px-1">
        {/* Category: Animal */}
        <BadgeButton
          name="The Pawtector"
          description="Working towards conservation and preserving habitats."
          count={achievements?.categories?.animal}
          medal="bronze"
          icon={FaPaw}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Pet Champion"
          description="Assisting animal shelters and promoting pet adoption."
          count={achievements?.categories?.animal}
          medal="silver"
          icon={FaPaw}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Wildlife Guardian"
          description="Safeguarding endangered species and their natural habitats."
          count={achievements?.categories?.animal}
          medal="gold"
          icon={FaPaw}
          refreshAchievements={fetchData}
        />

        {/* Category: Cultural */}
        <BadgeButton
          name="Arts Enthusiast"
          description="Passionate contributor to various art forms."
          count={achievements?.categories?.cultural}
          medal="bronze"
          icon={GiEarthAfricaEurope}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Heritage Advocate"
          description="Preserving and promoting local traditions."
          count={achievements?.categories?.cultural}
          medal="silver"
          icon={GiEarthAfricaEurope}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Cultural Ambassador"
          description="Celebrating diversity through cultural engagement."
          count={achievements?.categories?.cultural}
          medal="gold"
          icon={GiEarthAfricaEurope}
          refreshAchievements={fetchData}
        />

        {/* Category: Disaster */}
        <BadgeButton
          name="Emergency Responder"
          description="Providing immediate assistance in times of crisis."
          count={achievements?.categories?.disaster}
          medal="bronze"
          icon={GiFireExtinguisher}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Disaster Relief Hero"
          description="Helping communities rebuild after disasters."
          count={achievements?.categories?.disaster}
          medal="silver"
          icon={GiFireExtinguisher}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Resilience Champion"
          description="Preparing and educating the community."
          count={achievements?.categories?.disaster}
          medal="gold"
          icon={GiFireExtinguisher}
          refreshAchievements={fetchData}
        />

        {/* Category: Educational */}
        <BadgeButton
          name="Youth Mentor"
          description="Guiding and empowering young individuals."
          count={achievements?.categories?.educational}
          medal="bronze"
          icon={FaGraduationCap}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Knowledge Facilitator"
          description="Sharing knowledge and resources with learners."
          count={achievements?.categories?.educational}
          medal="silver"
          icon={FaGraduationCap}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Lifelong Learner"
          description="Inspiring others through continuous personal growth."
          count={achievements?.categories?.educational}
          medal="gold"
          icon={FaGraduationCap}
          refreshAchievements={fetchData}
        />

        {/* Category: Environmental */}
        <BadgeButton
          name="Green Warrior"
          description="Advocating for environmental causes and initiatives."
          count={achievements?.categories?.environmental}
          medal="bronze"
          icon={FaLeaf}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Nature Steward"
          description="Protecting habitats and promoting sustainable practices."
          count={achievements?.categories?.environmental}
          medal="silver"
          icon={FaLeaf}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Sustainable Living Advocate"
          description="Inspiring eco-friendly choices for a greener world."
          count={achievements?.categories?.environmental}
          medal="gold"
          icon={FaLeaf}
          refreshAchievements={fetchData}
        />

        {/* Category: Health */}
        <BadgeButton
          name="Community Health Promoter"
          description="Attending events for improved community health."
          count={achievements?.categories?.health}
          medal="bronze"
          icon={MdLocalHospital}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Healthcare Advocate"
          description="Supporting better access to healthcare services."
          count={achievements?.categories?.health}
          medal="silver"
          icon={MdLocalHospital}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Wellness Champion"
          description="Promoting holistic well-being in communities."
          count={achievements?.categories?.health}
          medal="gold"
          icon={MdLocalHospital}
          refreshAchievements={fetchData}
        />

        {/* Category: Social */}
        <BadgeButton
          name="Community Builder"
          description="Strengthening bonds and fostering social connections."
          count={achievements?.categories?.social}
          medal="bronze"
          icon={TiGroup}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Empowerment Advocate"
          description="Championing equality and empowerment for all."
          count={achievements?.categories?.social}
          medal="silver"
          icon={TiGroup}
          refreshAchievements={fetchData}
        />
        <BadgeButton
          name="Social Justice Advocate"
          description=" Fighting for fairness and inclusive communities."
          count={achievements?.categories?.social}
          medal="gold"
          icon={TiGroup}
          refreshAchievements={fetchData}
        />
      </div>
    </div>
  );
};

export default Achievements;
