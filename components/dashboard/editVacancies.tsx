"use client";

import { useState } from "react";
import { Title } from "@/components/shared/title";
import { updateJob } from "@/lib/data";
import { useRouter } from "next/navigation";

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

interface Job {
  id: string;
  name: string;
  description: string;
  salary: string;
  city: string;
  region: string;
  responsibilities: string[];
  bonuses: string[];
}

export default function EditVacancies({ job }: { job: Job }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Job>(job);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      await updateJob(formData.id, {
        name: formData.name,
        description: formData.description,
        salary: formData.salary,
        city: formData.city,
        region: formData.region,
        responsibilities: formData.responsibilities,
        bonuses: formData.bonuses,
      });
      router.push("/vacancies");
      router.refresh();
    } catch (error) {
      setError("Došlo k chybě při aktualizaci pracovní nabídky");
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="p-4 text-blue-600 font-semibold max-w-screen-xl mx-auto">
      <Title text="Upravit pracovní nabídku" size="xl" className="mb-4" />
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
          Aktualizujte
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
