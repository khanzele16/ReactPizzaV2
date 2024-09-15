import './Footer.css'

function Footer() {
	return (
		<div className='Footer'>
			<div className='Footer-info'>
				<p>Этот проект создан в качестве демонстрации кода, с использованием фреймворка React</p>
				<p>Ссылки для связи с автором:</p>
			</div>
			<div className='Footer-href'>
				<img src='https://emojigraph.org/media/apple/popcorn_1f37f.png' alt='' />
				<a href='https://github.com/khanzele16' target='_blank'>github.com/khanzele16</a>
				<img src='https://emojigraph.org/media/apple/doughnut_1f369.png' alt='' />
				<a href='https://t.me/khanzele' target='_blank'>telegram/khanzele</a>
				<img src='https://emojigraph.org/media/apple/cookie_1f36a.png' alt='' />
				<a>//портфолио-сайт</a>
				<img src='https://emojigraph.org/media/apple/beverage-box_1f9c3.png' alt='' />
			</div>
			<div id='footer-react-logo'><img src='https://emojigraph.org/media/apple/pizza_1f355.png' alt='' /><p>React Pizza 2024</p></div>
		</div>
	)
}

export default Footer
