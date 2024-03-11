type FormatType = "YYYY-MM-DD HH:mm:ss.SSSZ" | "YYYY-MM-DD" | "MM-DD-YYYY" | "datetime" | "YYYY/MM/DD" | "MM/DD/YYYY";

type Props = {
    from: {
        format: FormatType,
        value: string | Date
    },
    to: {
        format: FormatType
    }
};



const getFormattedDate = (date: Date, format: FormatType): string | Date => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    switch (format) {
        case "YYYY-MM-DD HH:mm:ss.SSSZ":
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
        case "YYYY-MM-DD":
            return `${year}-${month}-${day}`;
        case "MM-DD-YYYY":
            return `${month}-${day}-${year}`;
        case "YYYY/MM/DD":
            return `${year}/${month}/${day}`;
        case "MM/DD/YYYY":
            return `${month}/${day}/${year}`;
        case "datetime":
            return date;
        default:
            throw new Error('Invalid format');
    }
};

const parseDate = (value: string | Date, format: FormatType): Date => {
    switch (format) {
        case "YYYY-MM-DD HH:mm:ss.SSSZ":
            return new Date(value);
        case "YYYY-MM-DD":
            return new Date(value);
        case "MM-DD-YYYY":
            if (typeof value === 'string') {
                const [month, day, year] = value.split('-');
                return new Date(`${year}-${month}-${day}`);
            } else {
                return value
            }
        case "YYYY/MM/DD":
            if (typeof value === 'string') {
                const [year, month, day] = value.split('/');
                return new Date(`${year}-${month}-${day}`);
            } else {
                return value;
            }
        case "MM/DD/YYYY":
            if (typeof value === 'string') {
                const [month, day, year] = value.split('/');
                return new Date(`${year}-${month}-${day}`);
            } else {
                return value;
            }
        case "datetime":
            return new Date(value);
        default:
            throw new Error('Invalid format');
    }
};

export const formatDate = ({
    from: {
        format: fromFormat,
        value: fromValue
    },
    to: {
        format: toFormat
    }
}: Props) => {
    const date = parseDate(fromValue, fromFormat);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    return getFormattedDate(date, toFormat);
};