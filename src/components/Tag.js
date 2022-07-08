import { FormCheckbox } from "shards-react";

const Tag = ({ tag, onChange }) => {
  return (
    <div style={{marginLeft: "100px"}}>
        <FormCheckbox key={tag.tag} checked={tag.selected} onChange={() => onChange(tag.id)}>{tag.tag}</FormCheckbox>
    </div>
  )
}

export default Tag