"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Title } from "../shared/title";
import { WhiteBlock } from "../shared/white-block";
import NoAvatar from "/public/noavatar.png";
import { deleteUser, updateUserStatus } from "@/lib/data";
import { useRouter } from "next/navigation";

interface Props {
  fullName: string;
  id: string;
  imageUrl: string;
  gender: string;
  age: number;
  city: string;
  region: string;
  professions: string;
  expectedSalary: number;
  phone: string;
  email: string;
  checked: string;
  className?: string;
  createdAt: string;
}

const UserCard: React.FC<Props> = ({
  className,
  id,
  fullName,
  imageUrl,
  gender,
  age,
  city,
  region,
  professions,
  expectedSalary,
  phone,
  email,
  checked,
  createdAt,
}) => {
  const [validImage, setValidImage] = React.useState<string>(NoAvatar.src);

  const [status, setStatus] = React.useState(checked);
  const router = useRouter();

  React.useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setValidImage(imageUrl);
    img.onerror = () => setValidImage(NoAvatar.src);
  }, [imageUrl]);

  const toggleChecked = async () => {
    try {
      const newStatus = status === "selected" ? "unselected" : "selected";

      await updateUserStatus(id, newStatus);

      setStatus(newStatus);

      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <WhiteBlock
      className={cn(
        className,
        "text-blue-800 h-fit",
        checked === "selected" && "grayscale"
      )}
    >
      <div className="block sm:flex justify-around items-center lg:block">
        <div className="flex justify-center p-6 bg-blue-50 sm:bg-inherit lg:bg-blue-50 sm:border-r-4 lg:border-none border-dashed border-blue-200 lg:rounded-lg h-[260px]">
          <img
            src={validImage}
            alt={fullName}
            className="size-[215px] rounded-full"
          />
        </div>

        <div className="px-6 pb-2 flex-1">
          <Title
            text={fullName}
            size="md"
            className="mb-1 mt-3 font-bold text-center"
          />

          <div className="flex justify-between flex-col sm:flex-row">
            <p>
              <b>Pohlaví:</b> {gender === "male" ? "Muž" : "Žena"}
            </p>
            <p>
              <b>Věk:</b> {age}
            </p>
          </div>

          <p>
            <b>Město:</b> {city}
          </p>
          <p>
            <b>Kraj:</b> {region}
          </p>

          <p>
            <b>Email:</b> {email}
          </p>

          <p>
            <b>Telefonní číslo:</b> {phone}
          </p>

          <p>
            <b>Požadovanou práci:</b> {professions}
          </p>

          <p>
            <b>Očekávaný plat:</b> {expectedSalary} kč
          </p>

          <p>
            <b>Vytvořeno v:</b>{" "}
            {new Date(createdAt).toLocaleDateString("uk-UA")}
          </p>

          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={toggleChecked}
              className={cn(
                "text-base font-bold bg-blue-800 hover:bg-blue-900"
              )}
            >
              {checked === "unselected" ? "Zaškrtněte" : "Zrušte zaškrtnutí"}
            </Button>
            <Button
              onClick={handleDelete}
              className={cn(
                "text-base font-bold bg-rose-800 hover:bg-rose-900"
              )}
            >
              Odstranit
            </Button>
          </div>
        </div>
      </div>
    </WhiteBlock>
  );
};

export default UserCard;
