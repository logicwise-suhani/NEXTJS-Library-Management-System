import styles from "./searchbar.module.css";

function SearchBar({ value, onChange }) {

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="🔎 Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;  