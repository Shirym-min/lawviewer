import styles from './Sidebar.module.css'

const categories = [
	{ label: '全法令', active: true },
]

export function Sidebar() {
	return (
		<aside className={styles.sidebar} aria-label="法令カテゴリ">
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{categories.map((category) => (
						<li key={category.label} className={styles.listItem}>
							<button
								type="button"
								className={`${styles.item} ${category.active ? styles.active : ''}`}
								aria-current={category.active ? 'page' : undefined}
							>
								{category.label}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}

export default Sidebar
