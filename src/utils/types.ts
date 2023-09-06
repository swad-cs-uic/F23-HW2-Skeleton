export type FormData = {
  emailId: string;
  ldescription: string;
  name: string;
  sdescription: string;
};

export type RequestData = FormData & {
  isCompleted?: boolean;
};

export type RequestProps = {
  request: RequestData;
  index: number;
  onCancel: (index: number) => void;
  onComplete: (index: number) => void;
  reqCompleted: number[];
};

export type RequestListProps = {
  data: FormData[];
  setData: React.Dispatch<React.SetStateAction<FormData[]>>;
  reqCompleted: number[];
  setStatus: React.Dispatch<React.SetStateAction<number[]>>;
};

export type ChatMessage = {
  title: string;
  role: string;
  content: string;
};
