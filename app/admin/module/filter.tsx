import Label from "@/components/Label";
import InputText from "@/components/InputText";
import { BookListFilter } from "../interface";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Select from "@/components/Select";
import { option } from "../add/page";

type FilterProps = {
  params: BookListFilter;
  setParams: Dispatch<SetStateAction<any>>;
};
 const options_delete = [ 
  {
    value: "true",
    label: "sudah dihapus"
  },
  {
    value: "false",
    label: "Blom dihapus"
  }
]


const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  let [eror, setError] = useState<any>();

  const handleChange = (e: ChangeEvent<any>) => {
    setParams((params: BookListFilter) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section>
      <section className="space-y-3 pt-5">
        <section>
          <Label title="judul" htmlFor="Judul" />
          <InputText
            onChange={handleChange}
            name="judul"
            id="judul"
            value={params.judul}
          />
        </section>
        <section>
          <Label title="penulis" htmlFor="Penulis" />
          <InputText
            onChange={handleChange}
            name="penulis"
            id="penulis"
            value={params.penulis}
          />
        </section>
        <section>
          <Label title="dari tahun terbit" htmlFor="tahun_terbit" />
          <Select
            onChange={handleChange}
            options={option}
            value={params.tahun_terbit}
            name="tahun_terbit"
            id="tahun_terbit"
          />
        </section>
        <section>
          <Label title="is deleted" htmlFor="is_deleted" />
          <Select
            onChange={handleChange}
            options={options_delete}
            value={params.is_deleted}
            name="is_deleted"
            id="is_deleted"
          />
        </section>
        {eror && <p className="text-red-500 font-light text-xs">{eror}</p>}
      </section>
    </section>
  );
};

export default Filter;