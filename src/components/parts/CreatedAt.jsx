import dayjs from "dayjs";

export const CreatedAt = (props) => {
  const { day } = props;
  const date = dayjs(day.toDate());
//   console.log(date);

  return <span>{date.format("YYYY/MM/D")}</span>;
};
