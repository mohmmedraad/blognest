import { cva } from "class-variance-authority"
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Baseline,
    Bold,
    Check,
    ChevronDown,
    ChevronRight,
    ChevronsUpDown,
    Code2,
    Combine,
    Divide,
    Edit2,
    ExternalLink,
    Eye,
    FileCode,
    GripVertical,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Image,
    Indent,
    Italic,
    Keyboard,
    Link2,
    Link2Off,
    List,
    ListOrdered,
    MessageSquare,
    MessageSquarePlus,
    Minus,
    Moon,
    MoreHorizontal,
    Outdent,
    PaintBucket,
    Pilcrow,
    Plus,
    Quote,
    RectangleHorizontal,
    RectangleVertical,
    RotateCcw,
    Search,
    Settings,
    Smile,
    Strikethrough,
    Subscript,
    SunMedium,
    Superscript,
    Table,
    Text,
    Trash,
    Twitter,
    Underline,
    Ungroup,
    WrapText,
    X,
    type LucideIcon,
    type LucideProps,
} from "lucide-react"

export type Icon = LucideIcon

const Instagram = (props: LucideProps) => (
    <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M14.5 0.25H5.5C4.10807 0.251489 2.77358 0.805091 1.78933 1.78933C0.805091 2.77358 0.251489 4.10807 0.25 5.5V14.5C0.251489 15.8919 0.805091 17.2264 1.78933 18.2107C2.77358 19.1949 4.10807 19.7485 5.5 19.75H14.5C15.8919 19.7485 17.2264 19.1949 18.2107 18.2107C19.1949 17.2264 19.7485 15.8919 19.75 14.5V5.5C19.7485 4.10807 19.1949 2.77358 18.2107 1.78933C17.2264 0.805091 15.8919 0.251489 14.5 0.25ZM10 14.5C9.10998 14.5 8.23995 14.2361 7.49993 13.7416C6.75991 13.2471 6.18314 12.5443 5.84254 11.7221C5.50195 10.8998 5.41283 9.99501 5.58647 9.12209C5.7601 8.24918 6.18868 7.44736 6.81802 6.81802C7.44736 6.18868 8.24918 5.7601 9.12209 5.58647C9.99501 5.41283 10.8998 5.50195 11.7221 5.84254C12.5443 6.18314 13.2471 6.75991 13.7416 7.49993C14.2361 8.23995 14.5 9.10998 14.5 10C14.4988 11.1931 14.0243 12.337 13.1806 13.1806C12.337 14.0243 11.1931 14.4988 10 14.5ZM15.625 5.5C15.4025 5.5 15.185 5.43402 15 5.3104C14.815 5.18679 14.6708 5.01109 14.5856 4.80552C14.5005 4.59995 14.4782 4.37375 14.5216 4.15552C14.565 3.93729 14.6722 3.73684 14.8295 3.5795C14.9868 3.42217 15.1873 3.31502 15.4055 3.27162C15.6238 3.22821 15.85 3.25049 16.0555 3.33564C16.2611 3.42078 16.4368 3.56498 16.5604 3.74998C16.684 3.93499 16.75 4.1525 16.75 4.375C16.75 4.67337 16.6315 4.95952 16.4205 5.1705C16.2095 5.38147 15.9234 5.5 15.625 5.5ZM13 10C13 10.5933 12.8241 11.1734 12.4944 11.6667C12.1648 12.1601 11.6962 12.5446 11.1481 12.7716C10.5999 12.9987 9.99667 13.0581 9.41473 12.9424C8.83279 12.8266 8.29824 12.5409 7.87868 12.1213C7.45912 11.7018 7.1734 11.1672 7.05764 10.5853C6.94189 10.0033 7.0013 9.40013 7.22836 8.85195C7.45542 8.30377 7.83994 7.83524 8.33329 7.50559C8.82664 7.17595 9.40666 7 10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10Z"
            fill="currentColor"
        />
    </svg>
)

// const X = (props: LucideProps) => (
//     <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         {...props}
//     >
//         <path
//             d="M16.641 5H19.095L13.735 10.93L20.041 19H15.103L11.236 14.106L6.81102 19H4.35602L10.09 12.657L4.04102 5H9.10302L12.599 9.474L16.641 5Z"
//             fill="currentColor"
//         />
//     </svg>
// )

const Linkedin = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 7C4 5.343 5.343 4 7 4H17C18.657 4 20 5.343 20 7V17C20 18.657 18.657 20 17 20H7C5.343 20 4 18.657 4 17V7ZM8.85 17.393V10.169H6.434V17.393H8.85ZM7.642 9.182C8.484 9.182 9.009 8.628 9.009 7.934C8.993 7.225 8.484 6.686 7.658 6.686C6.831 6.686 6.291 7.225 6.291 7.934C6.291 8.628 6.815 9.182 7.626 9.182H7.642ZM12.604 17.393V13.359C12.604 13.143 12.62 12.928 12.683 12.773C12.858 12.342 13.256 11.895 13.923 11.895C14.798 11.895 15.148 12.557 15.148 13.529V17.393H17.564V13.251C17.564 11.032 16.372 9.999 14.782 9.999C13.5 9.999 12.925 10.699 12.604 11.192V10.169H10.187C10.219 10.844 10.188 17.352 10.187 17.394L12.604 17.393Z"
            fill="currentColor"
        />
    </svg>
)

const Google = (props: LucideProps) => (
    <svg
        {...props}
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <g clip-path="url(#clip0_632_6163)">
            <rect x="0.573608" width="23.6" height="24" fill="url(#pattern0)" />
        </g>
        <defs>
            <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
            >
                <use
                    xlinkHref="#image0_632_6163"
                    transform="scale(0.00423729 0.00416667)"
                />
            </pattern>
            <clipPath id="clip0_632_6163">
                <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.333374)"
                />
            </clipPath>
            <image
                id="image0_632_6163"
                width="236"
                height="240"
                xlinkHref="data:image/png;base64,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"
            />
        </defs>
    </svg>
)

const borderAll = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm10 13h5a1 1 0 0 0 1-1v-5h-6v6zm-2-6H5v5a1 1 0 0 0 1 1h5v-6zm2-2h6V6a1 1 0 0 0-1-1h-5v6zm-2-6H6a1 1 0 0 0-1 1v5h6V5z" />
    </svg>
)

const borderBottom = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-2 7a1 1 0 1 1 2 0 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm17-8a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3z" />
    </svg>
)

const borderLeft = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M6 21a1 1 0 1 0 0-2 1 1 0 0 1-1-1V6a1 1 0 0 1 1-1 1 1 0 0 0 0-2 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3zm7-16a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm6 6a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm4-17a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zm-1 17a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
    </svg>
)

const borderNone = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M14 4a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-9 7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-6 10a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zM7 20a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3z" />
    </svg>
)

const borderRight = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm9 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM6 3a1 1 0 0 1 0 2 1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3zm1 17a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1V6a1 1 0 0 0-1-1 1 1 0 1 1 0-2 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3z" />
    </svg>
)

const borderTop = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 6a1 1 0 0 0 2 0 1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3zm2 5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-8 1a1 1 0 1 0 0-2 1 1 0 0 1-1-1 1 1 0 1 0-2 0 3 3 0 0 0 3 3zm11-1a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
    </svg>
)

export const Icons = {
    hr: Divide,
    instagram: Instagram,
    x: X,
    linkedin: Linkedin,
    google: Google,
    add: Plus,
    alignCenter: AlignCenter,
    alignJustify: AlignJustify,
    alignLeft: AlignLeft,
    alignRight: AlignRight,
    arrowDown: ChevronDown,
    bg: PaintBucket,
    blockquote: Quote,
    bold: Bold,
    borderAll,
    borderBottom,
    borderLeft,
    borderNone,
    borderRight,
    borderTop,
    check: Check,
    chevronRight: ChevronRight,
    chevronsUpDown: ChevronsUpDown,
    clear: X,
    close: X,
    code: Code2,
    codeblock: FileCode,
    color: Baseline,
    column: RectangleVertical,
    combine: Combine,
    ungroup: Ungroup,
    comment: MessageSquare,
    commentAdd: MessageSquarePlus,
    delete: Trash,
    dragHandle: GripVertical,
    editing: Edit2,
    emoji: Smile,
    externalLink: ExternalLink,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    image: Image,
    indent: Indent,
    italic: Italic,
    kbd: Keyboard,
    lineHeight: WrapText,
    link: Link2,
    minus: Minus,
    more: MoreHorizontal,
    ol: ListOrdered,
    outdent: Outdent,
    paragraph: Pilcrow,
    refresh: RotateCcw,
    row: RectangleHorizontal,
    search: Search,
    settings: Settings,
    strikethrough: Strikethrough,
    subscript: Subscript,
    superscript: Superscript,
    table: Table,
    text: Text,
    trash: Trash,
    ul: List,
    underline: Underline,
    unlink: Link2Off,
    viewing: Eye,

    // www
    gitHub: (props: LucideProps) => (
        <svg viewBox="0 0 438.549 438.549" {...props}>
            <path
                fill="currentColor"
                d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
            ></path>
        </svg>
    ),
    logo: (props: LucideProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
            />
        </svg>
    ),
    moon: Moon,
    sun: SunMedium,
    twitter: Twitter,
}

export const iconVariants = cva("", {
    variants: {
        variant: {
            toolbar: "size-5",
            menuItem: "mr-2 size-5",
        },
        size: {
            sm: "mr-2 size-4",
            md: "mr-2 size-6",
        },
    },
    defaultVariants: {},
})
