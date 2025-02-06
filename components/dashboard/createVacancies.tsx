"use client";

import { useState } from "react";
import { Title } from "@/components/shared/title";
import { createJob } from "@/lib/data";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import mongoose from "mongoose";

const regions = [
  "Vyberte kraj",
  "Praha",
  "Středočeský",
  "Jihočeský",
  "Plzeňský",
  "Karlovarský",
  "Ústecký",
  "Liberecký",
  "Královéhradecký",
  "Pardubický",
  "Vysočina",
  "Jihomoravský",
  "Olomoucký",
  "Zlínský",
  "Moravskoslezský",
];

export default function CreateVacancies() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    salary: "",
    city: "",
    region: regions[0],
    responsibilities: [""],
    bonuses: [""],
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (field: "responsibilities" | "bonuses") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeLastItem = (field: "responsibilities" | "bonuses") => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].slice(0, -1),
      }));
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "responsibilities" | "bonuses"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.region === "Vyberte kraj") {
      setError("Vyberte kraj");
      return;
    }

    for (const [key, value] of Object.entries(formData)) {
      if (key === "responsibilities" || key === "bonuses") {
        if (Array.isArray(value) && value.some((item) => item === "")) {
          setError("Vyplňte všechna prázdná pole");
          return;
        }
      } else if (!value) {
        setError("Vyplňte všechna prázdná pole");
        return;
      }
    }

    try {
      await createJob(formData);
      router.push("/vacancies");
      router.refresh();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        let errorMessage = "";
        if (error.errors.name) {
          errorMessage += 'Vyplňte pole "Název práce". ';
        }
        if (error.errors.region) {
          errorMessage += "Vyberte správný kraj.";
        }
        setError(
          errorMessage ||
            "Došlo k chybě validace při vytváření pracovní nabídky"
        );
      } else {
        setError("Došlo k chybě při vytváření pracovní nabídky");
      }
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="p-4 text-blue-600 font-semibold max-w-screen-xl mx-auto">
      <Title
        text="Vytvořte novou pracovní nabídku"
        size="xl"
        className="mb-4"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Název práce"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Popis"
          className="w-full p-2 border rounded"
        />
        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Plat"
          className="w-full p-2 border rounded"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Město"
          className="w-full p-2 border rounded"
        />
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {regions.map((voi) => (
            <option key={voi} value={voi}>
              {voi}
            </option>
          ))}
        </select>
        {formData.responsibilities.map((resp, index) => (
          <input
            key={`resp-${index}`}
            value={resp}
            onChange={(e) => handleArrayChange(e, index, "responsibilities")}
            placeholder={`Odpovědnost ${index + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => addItem("responsibilities")}
            className="bg-green-500 text-white p-2 rounded"
          >
            Přidejte odpovědnost
          </button>
          <button
            type="button"
            onClick={() => removeLastItem("responsibilities")}
            disabled={formData.responsibilities.length === 1}
            className="bg-red-500 text-white p-2 rounded"
          >
            Odstraňte poslední odpovědnost
          </button>
        </div>
        {formData.bonuses.map((bonus, index) => (
          <input
            key={`bonus-${index}`}
            value={bonus}
            onChange={(e) => handleArrayChange(e, index, "bonuses")}
            placeholder={`Bonus ${index + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => addItem("bonuses")}
            className="bg-green-500 text-white p-2 rounded"
          >
            Přidejte bonus
          </button>
          <button
            type="button"
            onClick={() => removeLastItem("bonuses")}
            disabled={formData.bonuses.length === 1}
            className="bg-red-500 text-white p-2 rounded"
          >
            Odstraňte poslední bonus
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Vytvořte
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
