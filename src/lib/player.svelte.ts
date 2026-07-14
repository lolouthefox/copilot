export class PlayerState {
	metadata: {
		title: string;
		artist: string;
		thumbnail: string;
	} = $state({ title: '', artist: '', thumbnail: '' });
	currentTrackId: string = $state('');
	isPlaying: boolean = $state(false);
	duration: number = $state(0);
	currentTime: number = $state(0);

	events: {
		play: () => void;
		pause: () => void;
		seek: (time: number) => void;
		playTrack: (id: string) => void;
	} = $state({
		play: () => void 0,
		pause: () => void 0,
		seek: () => void 0,
		playTrack: () => void 0
	});

	togglePlay() {
		if (this.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	}
	play() {
		this.isPlaying = true;
		this.events.play();
	}
	pause() {
		this.isPlaying = false;
		this.events.pause();
	}
	playTrack(trackId: string) {
		this.currentTrackId = trackId;
		this.isPlaying = true;
		this.currentTime = 0;
		this.events.playTrack(trackId);
	}
	seekTo(time: number) {
		this.currentTime = time;
		this.events.seek(time);
	}
}
