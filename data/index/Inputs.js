export const createEmployeeInputs = [
  {
    name: "fullName",
    type: "text",
    placeholder: "Emil Zlatinov",
    label: "Full Name",
    _id: "01",
  },
  {
    name: "email",
    type: "email",
    placeholder: "emilzlatinov123@gmail.com",
    label: "Email",
    _id: "02",
  },
  {
    name: "phoneNumber",
    type: "number",
    placeholder: "+359 87 623 7725",
    label: "Phone Number",
    _id: "03",
  },
  {
    name: "birthday",
    type: "date",
    placeholder: "",
    label: "Birthday",
    _id: "04",
  },
  {
    name: "monthSalary",
    type: "number",
    placeholder: "e.g., $10 000",
    label: "Month Salary",
    _id: "05",
    className: "col-span-2",

    additionalProps: {
      step: 0.01,
      inputMode: "decimal",
    },
  },
];

export const createTaskInput = [
  {
    name: "title",
    className: "col-span-2",
    type: "text",
    placeholder: "Submit button is unable to fetch data in index menu",
    label: "Title",
    _id: "01",
  },
  {
    name: "assignee",
    type: "dropdown",
    listValue: "Assignee",

    placeholder: "Emil Zlatinov",
    label: "Assignee",
    _id: "03",
  },
  {
    name: "dueDate",
    className: "max-lg:my-4",
    type: "date",
    placeholder: "",
    label: "Due date",
    _id: "04",
  },

  {
    isLargeText: true,
    className: "col-span-2",
    classNameInput: "text-red-200",
    name: "description",
    type: "text",
    placeholder: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolore expedita, distinctio quia vel eaque libero, nemo voluptates minus recusandae dolor incidunt aut non aperiam quo ratione at modi nam?`,
    label: "Description",
    additionalProps: {
      rows: 4,
    },
    _id: "02",
  },
];
