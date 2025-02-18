import React, { FormEvent, useEffect, useState } from "react";
import { getMaps } from "../../api/admin";
import validator from "validator";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface Map {
  _id: string;
  sl_no: number;
  place: string;
  pin: number;
}
interface AddAgentModalProps {
  iseditOpen: boolean;
  oneditClose: () => void;
  agentDatas: (agentData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    map: string;
  }) => void;
}

const EditAgentModal: React.FC<AddAgentModalProps> = ({
  iseditOpen,
  oneditClose,
  agentDatas,
}) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [map, setMap] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const Maps = await getMaps();

        if (Maps?.data) {
          setMaps(Array.isArray(Maps?.data) ? (Maps?.data as Map[]) : []);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch agents");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (!iseditOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !validator.isEmail(email))
      newErrors.email = "Valid email is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    await agentDatas({ name, email, password, phone, map });
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setMap("");
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit Agent</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Mobile</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400">Select place</label>
              <select
                value={map}
                onChange={(e) => setMap(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              >
                <option value="">Select a place</option>
                {maps.map((map) => (
                  <option key={map.sl_no} value={map._id}>
                    {map.place}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={oneditClose}
                className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAgentModal;
