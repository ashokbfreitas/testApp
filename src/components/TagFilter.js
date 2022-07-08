import Tag from "./Tag";

const TagFilter = ({type, tags, onChange}) => {
  return (
    <div style={{margin: "10px auto", padding: "20px 25px", outline: "1px solid black"}}>
        <p style={{textAlign: "center"}}>{type}</p>
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} onChange={onChange} />
        ))}
    </div>
  )
}

export default TagFilter