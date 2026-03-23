<!DOCTYPE html>
<html lang="en" class="h-full overflow-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Sea Diary: Match Edition Pro</title>
    <link rel="manifest" href="/competition-Scorer/manifest.json">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        
        /* HARDWARE SYSTEM LOCKS */
        html, body {
            font-family: 'Inter', sans-serif;
            background-color: #020617; 
            color: #ffffff;
            -webkit-user-select: none;
            user-select: none;
            width: 100%;
            height: 100dvh; 
            position: fixed; 
            overflow: hidden; 
            overscroll-behavior: none;
            margin: 0;
            padding: 0;
        }


        #app-container {
            width: 100%;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: background-color 0.6s ease;
        }


        /* GRACE PERIOD RED ALERT */
        #app-container.grace-active {
            background-color: #450a0a !important; 
        }


        @keyframes sync-pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.98); }
            100% { opacity: 1; transform: scale(1); }
        }


        .grace-pulse {
            animation: sync-pulse 1s infinite ease-in-out;
            color: #ef4444 !important;
        }


        .grace-btn-pulse {
            animation: sync-pulse 1s infinite ease-in-out;
            background-color: #b91c1c !important;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
        }


        /* KEYBOARD SCROLL PROTECTION */
        .scrollable-area {
            flex: 1;
            min-height: 0; 
            overflow-y: auto;
            -webkit-overflow-scrolling: touch; 
            overscroll-behavior-y: contain;
            padding-bottom: 250px !important; 
        }


        .view-frame {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }


        .match-card {
            background-color: #1e293b; 
            border: 1px solid #334155; 
            border-radius: 1rem;
            box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.6);
            transition: border-color 0.3s, box-shadow 0.3s;
        }


        /* V5.0.0 ACTIVE FOCUS GLOW */
        input:focus, select:focus {
            border-color: #f59e0b !important;
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
            outline: none;
        }


        .text-amber { color: #f59e0b; }
        .bg-amber { background-color: #f59e0b; }


        /* HYPE TIMER CIRCULAR UI */
        @keyframes pulse-ring {
            0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(245, 158, 11, 0); }
            100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        
        
        .hype-number {
            font-size: 7rem;
            font-weight: 900;
            color: #f59e0b;
            animation: pulse-ring 1s infinite;
            border-radius: 50%;
            border: 8px solid #f59e0b;
        }


        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
            text-align: center;
        }


        .atm-btn {
            background: #1e293b;
            border: 2px solid #334155;
            border-radius: 12px;
            font-size: 1.5rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            transition: background 0.1s;
            color: #f8fafc;
        }
        .atm-btn:active { background: #3b82f6; color: #ffffff; }
        
        
        #broadcastToast {
            transform: translateY(-150%);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #broadcastToast.show { transform: translateY(0); }
        
        
        .drawer-right {
            transition: transform 0.3s ease-in-out;
            transform: translateX(100%);
        }
        .drawer-right.open { transform: translateX(0); }


        .drawer-left {
            transition: transform 0.3s ease-in-out;
            transform: translateX(-100%);
        }
        .drawer-left.open { transform: translateX(0); }
        
        
        .hidden { display: none !important; }


        .history-tab.active {
            background-color: #3b82f6; 
            color: #ffffff;
            border-color: #60a5fa;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }


        #customEndModal, #installModal {
            background: rgba(0,0,0,0.92);
            backdrop-filter: blur(15px);
        }


        .splash-text {
            font-size: 3rem;
            font-weight: 900;
            color: #f59e0b;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: -0.05em;
            line-height: 1;
        }
    </style>
</head>
<body>


    <div id="broadcastToast" class="fixed top-4 inset-x-4 z-[200] bg-blue-600 text-white p-4 rounded-xl shadow-2xl flex items-center space-x-4 border-2 border-white/20">
        <i class="fa-solid fa-bullhorn text-xl animate-bounce"></i>
        <div class="flex-1">
            <p class="font-black uppercase text-[9px] tracking-widest leading-none opacity-80 text-center">Match Alert</p>
            <p id="broadcastMsg" class="font-bold text-xs leading-tight mt-1 text-center"></p>
        </div>
    </div>




    <div id="customEndModal" class="fixed inset-0 z-[300] hidden flex items-center justify-center p-6 text-center">
        <div class="match-card w-full max-sm p-6 space-y-5 border-2 border-amber">
            <div class="text-center">
                <i class="fa-solid fa-clock-rotate-left text-amber text-3xl mb-2"></i>
                <h3 class="text-lg font-black uppercase tracking-tight text-white text-center">Change Ending Time</h3>
                <p class="text-slate-400 text-[10px] mt-1 leading-relaxed text-center">Modify the tournament clock for all connected devices.</p>
            </div>
            <div class="grid grid-cols-1 gap-2.5">
                <button onclick="stewardSetNewEnd(1)" class="bg-slate-900 border border-slate-700 py-3.5 rounded-lg font-black text-white active:bg-amber active:text-slate-900 transition uppercase tracking-widest text-[11px] text-center">1 MINUTE LEFT</button>
                <button onclick="stewardSetNewEnd(5)" class="bg-slate-900 border border-slate-700 py-3.5 rounded-lg font-black text-white active:bg-amber active:text-slate-900 transition uppercase tracking-widest text-[11px] text-center">5 MINUTES LEFT</button>
                <button onclick="stewardSetNewEnd(10)" class="bg-slate-900 border border-slate-700 py-3.5 rounded-lg font-black text-white active:bg-amber active:text-slate-900 transition uppercase tracking-widest text-[11px] text-center">10 MINUTES LEFT</button>
                <button onclick="stewardSetNewEnd(0)" class="bg-red-600 py-3.5 rounded-lg font-black text-white active:bg-red-700 transition uppercase tracking-widest text-[10px] leading-none text-center">STRIKE NOW<br><span class="text-[8px] opacity-60 text-center">(Activates 5 Min Grace)</span></button>
            </div>
            <button onclick="document.getElementById('customEndModal').classList.add('hidden')" class="w-full text-slate-500 font-black uppercase text-[9px] tracking-[0.3em] pt-3 text-center">Return</button>
        </div>
    </div>




    <div id="installModal" class="fixed inset-0 z-[400] hidden flex items-center justify-center p-6 text-center">
        <div class="match-card w-full max-w-sm p-6 space-y-5 border-2 border-blue-500">
            <div class="text-center text-center">
                <i class="fa-solid fa-mobile-screen-button text-blue-400 text-4xl mb-2 text-center"></i>
                <h3 class="text-lg font-black uppercase tracking-tight text-white text-center text-center">Device Installation</h3>
                <p id="installInstructionText" class="text-slate-400 text-xs mt-3 leading-relaxed text-center text-center"></p>
            </div>
            <button onclick="document.getElementById('installModal').classList.add('hidden')" class="w-full bg-blue-600 text-white font-black py-3.5 rounded-lg uppercase tracking-widest text-[10px] text-center text-center">Got it</button>
        </div>
    </div>




    <div id="app-container">


        <div id="view-home" class="view-frame items-center justify-center p-5 space-y-4 relative text-center">
            
            <button onclick="exitApp()" class="absolute top-5 right-5 bg-slate-900 border border-slate-700 text-slate-400 font-black px-3 py-2 rounded-lg text-[9px] uppercase tracking-[0.2em] active:bg-red-600 active:text-white transition shadow-md z-[50]">
                Close App <i class="fa-solid fa-xmark ml-1"></i>
            </button>


            <div class="text-center mt-6">
                <i class="fa-solid fa-stopwatch text-amber text-5xl mb-1 text-center"></i>
                <h1 class="text-2xl font-black tracking-tight mb-0.5 uppercase text-white text-center">Match Edition Pro</h1>
                
                <div class="text-slate-300 font-bold text-[10px] tracking-[0.3em] text-center uppercase opacity-90">Gold Master V5.3.0</div>
            </div>
            
            <div class="w-full max-w-sm space-y-3">
                <div class="match-card p-5 space-y-3 text-center shadow-lg">
                    <div>
                        <label class="block text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1.5 ml-1 text-center">Angler Profile</label>
                        <input type="text" id="playerName" onkeydown="if(event.key === 'Enter'){ document.getElementById('venueName').focus(); }" placeholder="Your Name" class="w-full bg-slate-900 border border-slate-700 text-white font-bold text-lg rounded-lg p-3 text-center focus:border-blue-500 outline-none shadow-inner">
                    </div>
                    <div>
                        <label class="block text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1.5 ml-1 text-center">Venue Rememory</label>
                        <input type="text" id="venueName" onkeydown="if(event.key === 'Enter'){ proceedToRoleSelection(); }" placeholder="Venue Name" class="w-full bg-slate-900 border border-slate-700 text-white font-bold text-lg rounded-lg p-3 text-center focus:border-amber outline-none shadow-inner">
                    </div>
                    <button id="btnContinueHome" onclick="proceedToRoleSelection()" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-4 rounded-xl shadow-md uppercase tracking-wide active:scale-95 transition-transform text-center">
                        Continue to Match <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                </div>
                
                <div class="flex space-x-2.5 pt-2 text-center">
                    <button onclick="navTo('history')" class="flex-1 bg-slate-800 text-slate-300 font-black py-3.5 rounded-lg text-[10px] uppercase border border-slate-700 active:bg-slate-700 transition tracking-widest">
                        <i class="fa-solid fa-book mr-1.5 text-blue-400"></i> History
                    </button>
                    <button id="btnGuideUpdate" onclick="document.getElementById('guideDrawer').classList.add('open')" class="flex-1 bg-slate-800 text-slate-300 font-black py-3.5 rounded-lg text-[9px] uppercase border border-slate-700 active:bg-slate-700 transition tracking-widest">
                        <i class="fa-solid fa-circle-info mr-1 text-amber"></i> Guide & Update
                    </button>
                </div>


                <button id="btnInstallGuide" onclick="showInstallGuide()" class="hidden w-full bg-slate-800 text-slate-300 font-black py-3.5 rounded-lg text-[10px] uppercase border border-slate-700 active:bg-blue-600 active:text-white transition tracking-widest text-center mt-2.5">
                    <i class="fa-solid fa-mobile-screen mr-1.5 text-blue-400"></i> Install App
                </button>
            </div>
        </div>




        <div id="view-role" class="hidden view-frame p-5 space-y-6 relative bg-[#020617] text-center">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3 pt-1 text-center">
                <button onclick="navTo('home')" class="text-slate-500 text-xl px-2 text-left"><i class="fa-solid fa-arrow-left text-center"></i></button>
                <h2 class="text-lg font-black uppercase tracking-tight text-white text-center">Match Access</h2>
                <button onclick="exitApp()" class="text-red-500 text-xl px-2 text-right"><i class="fa-solid fa-power-off text-center"></i></button>
            </div>
            
            <div class="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pb-20 text-center">
                
                <div class="text-center mb-8">
                    <p class="text-slate-400 font-black uppercase tracking-[0.4em] text-[9px] mb-3 text-center">Standard Angler Entry</p>
                    <button onclick="navTo('join')" class="w-full bg-green-600 hover:bg-green-500 text-white font-black text-xl py-12 rounded-2xl shadow-xl uppercase tracking-widest active:scale-95 transition-transform flex flex-col items-center justify-center border-b-4 border-green-800">
                        <i class="fa-solid fa-user-tag text-4xl mb-3"></i>
                        Join as Competitor
                    </button>
                </div>
                
                <div class="text-center pt-10 mt-6 border-t border-slate-800/40 text-center">
                    <button onclick="navTo('host')" class="w-full max-w-[200px] mx-auto bg-transparent border-2 border-slate-700 text-slate-500 font-black py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] active:bg-slate-800 active:text-amber transition-all flex items-center justify-center space-x-2">
                        <i class="fa-solid fa-crown text-sm text-center"></i>
                        <span>Host as Steward</span>
                    </button>
                    <p class="text-[8px] text-slate-600 mt-2 italic font-bold uppercase tracking-[0.3em] text-center">Administrative Access Only</p>
                </div>

            </div>
        </div>




        <div id="view-join" class="hidden view-frame p-4 bg-[#020617] text-center">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3 pt-1 text-center">
                <button onclick="navTo('role')" class="text-slate-500 text-xl px-2 text-center text-center"><i class="fa-solid fa-arrow-left text-center"></i></button>
                <h2 class="text-lg font-black uppercase tracking-tight text-white text-center">Authentication</h2>
                <div class="w-6 text-center text-center"></div>
            </div>
            <div class="text-center pt-6 pb-3 text-center">
                <h2 class="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-3 text-center">Enter Room PIN</h2>
                <div class="flex justify-center space-x-2 text-center">
                    <div class="w-14 h-16 bg-slate-800 border-b-4 border-amber rounded-lg flex items-center justify-center text-3xl font-black text-white shadow-md text-center" id="pin-1"></div>
                    <div class="w-14 h-16 bg-slate-800 border-b-4 border-amber rounded-lg flex items-center justify-center text-3xl font-black text-white shadow-md text-center" id="pin-2"></div>
                    <div class="w-14 h-16 bg-slate-800 border-b-4 border-amber rounded-lg flex items-center justify-center text-3xl font-black text-white shadow-md text-center" id="pin-3"></div>
                    <div class="w-14 h-16 bg-slate-800 border-b-4 border-amber rounded-lg flex items-center justify-center text-3xl font-black text-white shadow-md text-center" id="pin-4"></div>
                </div>
            </div>
            <div class="flex-1 grid grid-cols-3 gap-2.5 p-3 max-w-sm mx-auto w-full content-center text-center">
                <button class="atm-btn" onclick="atmPress(1)">1</button><button class="atm-btn" onclick="atmPress(2)">2</button><button class="atm-btn" onclick="atmPress(3)">3</button>
                <button class="atm-btn" onclick="atmPress(4)">4</button><button class="atm-btn" onclick="atmPress(5)">5</button><button class="atm-btn" onclick="atmPress(6)">6</button>
                <button class="atm-btn" onclick="atmPress(7)">7</button><button class="atm-btn" onclick="atmPress(8)">8</button><button class="atm-btn" onclick="atmPress(9)">9</button>
                <button class="atm-btn text-red-500 text-center" onclick="navTo('role')"><i class="fa-solid fa-xmark"></i></button><button class="atm-btn" onclick="atmPress(0)">0</button><button class="atm-btn text-amber text-center" onclick="atmDelete()"><i class="fa-solid fa-delete-left"></i></button>
            </div>
            <button id="btn-connect" onclick="connectToMatch()" class="hidden w-full max-w-sm mx-auto bg-blue-600 text-white font-black text-xl py-4 rounded-xl mb-8 shadow-xl uppercase tracking-widest active:scale-95 transition-transform text-center">Validate</button>
        </div>




        <div id="view-host" class="hidden view-frame p-5 space-y-4 text-center">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3 text-white text-center">
                <button onclick="navTo('role')" class="text-slate-500 text-xl px-2 text-center text-center"><i class="fa-solid fa-arrow-left text-center"></i></button>
                <h2 class="text-lg font-black uppercase tracking-tight text-white text-center text-center">Match Creator</h2>
                <div class="w-6 text-center text-center"></div>
            </div>
            <div class="match-card p-5 space-y-4 text-center">
                <div>
                    <label class="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1.5 text-center">Tournament Hours</label>
                    <select id="hostDuration" class="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-base font-black appearance-none text-white text-center shadow-inner">
                        <option value="1">1.0 Hour</option><option value="2">2.0 Hours</option><option value="3">3.0 Hours</option><option value="4" selected>4.0 Hours</option><option value="5">5.0 Hours</option>
                    </select>
                </div>
                <div>
                    <label class="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1.5 text-center">Rules Engine</label>
                    <select id="hostFormat" class="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-base font-black appearance-none text-white text-center shadow-inner">
                        <option value="length">Length Only (cm)</option><option value="length10">Length + 10 Pts</option><option value="weightLb">Weight (Lbs & Oz)</option><option value="weightKg">Weight (Kg & g)</option><option value="speciesHunt">Species Hunt</option>
                    </select>
                </div>
                <button onclick="createMatch()" class="w-full bg-amber text-slate-900 font-black text-lg py-4 rounded-xl mt-3 shadow-lg uppercase active:scale-95 transition-transform text-center">Initialize Match</button>
            </div>
        </div>




        <div id="view-waiting" class="hidden view-frame p-5 space-y-4 text-center">
            <div class="flex justify-between items-center w-full text-center">
                <button onclick="exitWaitingRoom()" class="text-slate-500 text-xl px-2 text-center text-center text-center"><i class="fa-solid fa-arrow-left text-center"></i></button>
                <div class="text-amber font-black tracking-[0.2em] bg-slate-800 px-5 py-1.5 rounded-lg border border-slate-700 shadow-md text-center text-center" id="displayPin">0000</div>
            </div>
            <div class="flex-1 flex flex-col items-center space-y-5 pt-3 text-center">
                <h3 class="text-xl font-black text-white uppercase tracking-tight text-center">Angler Lobby</h3>
                <div id="attendanceList" class="w-full max-w-sm flex-1 bg-slate-800/40 rounded-2xl border border-slate-800 p-4 space-y-2.5 overflow-y-auto shadow-inner text-center text-center text-center"></div>
                <div id="hostControls" class="hidden w-full max-w-sm pb-5 text-center">
                    <button onclick="triggerHypeStart()" class="w-full bg-red-600 text-white font-black text-xl py-4 rounded-2xl animate-pulse shadow-xl uppercase active:scale-95 transition-transform text-center">🚀 START MATCH</button>
                </div>
                <div id="joinerWaitingText" class="w-full max-w-sm pb-5 text-center text-center text-center">
                    <p class="text-base font-bold text-slate-400 italic text-center">Linked... Waiting for Steward.</p>
                </div>
            </div>
        </div>




        <div id="view-fishing" class="hidden view-frame relative bg-[#020617] text-center">
            <div class="flex-none bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-between items-center z-20 shadow-md text-center text-center">
                <div class="flex flex-col items-start text-center text-center">
                    <div class="flex items-center space-x-2 text-center text-center">
                        <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse text-center"></div>
                        <div class="text-base font-black tabular-nums tracking-tighter text-white leading-none text-center" id="mainTimer">00:00:00</div>
                    </div>
                    <span id="graceLabel" class="hidden text-[10px] font-black text-red-500 uppercase tracking-widest mt-1 ml-4 animate-pulse text-center">GRACE PERIOD</span>
                </div>
                <div class="flex items-center space-x-2.5 text-center text-center">
                    <i id="cloudSignal" class="fa-solid fa-cloud text-slate-700 text-base text-center"></i>
                    <div class="bg-slate-800 border border-slate-700 rounded-lg px-4 py-1 flex flex-col items-center justify-center min-w-[85px] shadow-inner text-center text-center">
                        <span class="text-[8px] font-black uppercase text-slate-500 tracking-widest leading-none mb-0.5">Total Points</span>
                        <span class="text-lg font-black text-white leading-none text-center" id="liveTallyBox">0</span>
                    </div>
                </div>
                <button id="wakeLockBtn" onclick="toggleWakeLock()" class="text-slate-400 border border-slate-800 px-2.5 py-1 rounded-md text-[9px] font-black uppercase text-center text-center"><i class="fa-solid fa-moon text-center"></i></button>
            </div>
            
            <div class="flex-none w-full bg-slate-900 border-b border-slate-800 z-10 p-2.5 text-center shadow-lg text-center text-center">
                <button onclick="document.getElementById('leaderboardDrawer').classList.add('open')" class="w-full bg-amber text-slate-900 font-black py-3.5 rounded-xl text-sm uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 transition-transform flex items-center justify-center text-center">
                    <i class="fa-solid fa-trophy mr-2.5 animate-bounce text-center"></i> View Live Leader Board
                </button>
            </div>


            <div id="loggingArea" class="scrollable-area p-4 space-y-4 text-center">
                
                <div class="match-card p-4 space-y-3.5 text-center text-center">
                    <div class="text-center text-center">
                        <label class="block text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1.5 ml-1 text-center">Fish Species</label>
                        
                        <select id="inputSpecies" onchange="checkSpeciesSelection()" class="w-full bg-slate-900 border-2 border-slate-800 p-2.5 rounded-lg text-base font-black appearance-none text-white focus:border-blue-500 transition shadow-inner text-center text-center">
                            <option value="" disabled selected>-- Select Fish --</option>
                            
                            <optgroup label="🏴󠁧󠁢󠁳󠁣󠁴󠁿 COMMON SCOTTISH SPECIES">
                                <option value="Cod">Cod</option>
                                <option value="Whiting">Whiting</option>
                                <option value="Coalfish (Saithe)">Coalfish (Saithe)</option>
                                <option value="Pollock">Pollock</option>
                                <option value="Haddock">Haddock</option>
                                <option value="Poor Cod">Poor Cod</option>
                                <option value="Conger Eel">Conger Eel</option>
                                <option value="Flounder">Flounder</option>
                                <option value="Dab">Dab</option>
                                <option value="Plaice">Plaice</option>
                                <option value="Lesser Spotted Dogfish">Lesser Spotted Dogfish</option>
                                <option value="Smoothhound">Smoothhound</option>
                                <option value="Spurdog">Spurdog</option>
                                <option value="Thornback Ray">Thornback Ray</option>
                                <option value="Grey Gurnard">Grey Gurnard</option>
                                <option value="Red Gurnard">Red Gurnard</option>
                                <option value="Mackerel">Mackerel</option>
                                <option value="Ballan Wrasse">Ballan Wrasse</option>
                            </optgroup>


                            <optgroup label="Roundfish">
                                <option value="Cod">Cod</option><option value="Whiting">Whiting</option><option value="Haddock">Haddock</option><option value="Pollock">Pollock</option><option value="Coalfish (Saithe)">Coalfish (Saithe)</option><option value="European Bass">European Bass</option><option value="Ling">Ling</option><option value="Pouting">Pouting</option><option value="Poor Cod">Poor Cod</option>
                            </optgroup>
                            
                            <optgroup label="Bass & Bream">
                                <option value="European Bass">European Bass</option><option value="Black Bream">Black Bream</option><option value="Gilthead Bream">Gilthead Bream</option><option value="Red Bream">Red Bream</option><option value="Couch’s Bream">Couch’s Bream</option>
                            </optgroup>
                            
                            <optgroup label="Flatfish">
                                <option value="Flounder">Flounder</option><option value="Plaice">Plaice</option><option value="Dab">Dab</option><option value="Turbot">Turbot</option><option value="Brill">Brill</option><option value="Dover Sole">Dover Sole</option><option value="Lemon Sole">Lemon Sole</option><option value="Megrim">Megrim</option>
                            </optgroup>
                            
                            <optgroup label="Sharks & Rays">
                                <option value="Lesser Spotted Dogfish">Lesser Spotted Dogfish</option><option value="Blackmouth Dogfish">Blackmouth Dogfish</option><option value="Bull Huss">Bull Huss</option><option value="Smoothhound">Smoothhound</option><option value="Starry Smoothhound">Starry Smoothhound</option><option value="Spurdog">Spurdog</option><option value="Tope">Tope</option><option value="Thornback Ray">Thornback Ray</option><option value="Spotted Ray">Spotted Ray</option><option value="Blonde Ray">Blonde Ray</option><option value="Small-Eyed Ray">Small-Eyed Ray</option><option value="Undulate Ray">Undulate Ray</option>
                            </optgroup>
                            
                            <optgroup label="Wrasse & Rockfish">
                                <option value="Ballan Wrasse">Ballan Wrasse</option><option value="Cuckoo Wrasse">Cuckoo Wrasse</option><option value="Corkwing Wrasse">Corkwing Wrasse</option><option value="Goldsinny Wrasse">Goldsinny Wrasse</option><option value="Rock Cook Wrasse">Rock Cook Wrasse</option><option value="Baillon’s Wrasse">Baillon’s Wrasse</option><option value="Scale-rayed Wrasse">Scale-rayed Wrasse</option><option value="Rainbow Wrasse">Rainbow Wrasse</option><option value="Five-bearded Rockling">Five-bearded Rockling</option><option value="Shore Rockling">Shore Rockling</option><option value="Three-bearded Rockling">Three-bearded Rockling</option><option value="Four-bearded Rockling">Four-bearded Rockling</option>
                            </optgroup>
                            
                            <optgroup label="Pelagics & Minis">
                                <option value="Mackerel">Mackerel</option><option value="Herring">Herring</option><option value="Scad (Horse Mackerel)">Scad (Horse Mackerel)</option><option value="Garfish">Garfish</option><option value="Three-Spined Stickleback">Three-Spined Stickleback</option><option value="Common Blenny (Shanny)">Common Blenny (Shanny)</option><option value="Tompot Blenny">Tompot Blenny</option><option value="Montagu's Blenny">Montagu's Blenny</option><option value="Common Goby">Common Goby</option>
                            </optgroup>
                            
                            <optgroup label="Eels & Gurnards">
                                <option value="Conger Eel">Conger Eel</option><option value="Common Eel">Common Eel</option><option value="Grey Gurnard">Grey Gurnard</option><option value="Tub Gurnard">Tub Gurnard</option><option value="Red Gurnard">Red Gurnard</option>
                            </optgroup>
                            
                            <optgroup label="Unlisted / Custom" id="customSpeciesGroup">
                                <option value="[ADD OTHER]">-- [Add Other Species...] --</option>
                            </optgroup>
                        </select>
                    </div>


                    <div id="deckSizeInputs" class="text-center text-center text-center">
                        <label class="block text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] mb-1.5 ml-1 text-center" id="labelSize">Capture Record</label>
                        
                        <div id="deckLength" class="text-center text-center">
                            <input type="number" id="inputSize" inputmode="decimal" onkeydown="if(event.key === 'Enter') { recordCatch(); this.blur(); }" onfocus="handleInputFocus(this)" class="w-full bg-slate-900 border-2 border-slate-800 p-4 rounded-lg text-2xl font-black text-center text-white focus:border-amber outline-none shadow-inner" placeholder="0">
                        </div>
                        
                        <div id="deckWeightLb" class="hidden flex space-x-2 text-center text-center text-center">
                            <div class="flex-1 text-center"><input type="number" id="inputLbs" inputmode="numeric" placeholder="Lbs" onfocus="handleInputFocus(this)" class="w-full bg-slate-900 border-2 border-slate-800 p-3 rounded-lg text-xl font-black text-center text-white focus:border-amber outline-none shadow-inner text-center"></div>
                            <div class="flex-1 text-center"><input type="number" id="inputOz" inputmode="numeric" placeholder="Oz" onkeydown="if(event.key === 'Enter') { recordCatch(); this.blur(); }" onfocus="handleInputFocus(this)" class="w-full bg-slate-900 border-2 border-slate-800 p-3 rounded-lg text-xl font-black text-center text-white focus:border-amber outline-none shadow-inner text-center"></div>
                        </div>


                        <div id="deckWeightKg" class="hidden flex space-x-2 text-center text-center text-center">
                            <div class="flex-1 text-center"><input type="number" id="inputKg" inputmode="numeric" placeholder="Kg" onfocus="handleInputFocus(this)" class="w-full bg-slate-900 border-2 border-slate-800 p-3 rounded-lg text-xl font-black text-center text-white focus:border-amber outline-none shadow-inner text-center"></div>
                            <div class="flex-1 text-center"><input type="number" id="inputGrammes" inputmode="numeric" placeholder="Grammes" onkeydown="if(event.key === 'Enter') { recordCatch(); this.blur(); }" onfocus="handleInputFocus(this)" class="w-full bg-slate-900 border-2 border-slate-800 p-3 rounded-lg text-xl font-black text-center text-white focus:border-amber outline-none shadow-inner text-center"></div>
                        </div>


                    </div>
                    <button id="btnRecord" onclick="recordCatch()" class="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-lg shadow-lg transition uppercase active:scale-95 text-center text-center text-center">Record Catch</button>
                </div>


                <div class="pt-1 text-center text-center text-center">
                    <h3 class="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-2 ml-1 opacity-60 text-center text-center">Match Journal</h3>
                    <div id="localCatchList" class="space-y-2 pb-5 text-center text-center text-center"></div>
                </div>


                <div class="pt-6 pb-24 text-center text-center text-center">
                    <button onclick="leaveMatchEarly()" class="w-full border-2 border-slate-800 text-slate-400 font-black py-4 rounded-2xl active:bg-slate-950 transition shadow-sm text-[9px] uppercase tracking-[0.5em] text-center text-center">
                        <i class="fa-solid fa-person-walking-arrow-right mr-1 text-center text-center"></i> Leave Match Early
                    </button>
                </div>
            </div>


            <div id="btnStewardPanelContainer" class="hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50 text-center text-center">
                <button onclick="document.getElementById('stewardDrawer').classList.add('open')" class="w-full bg-slate-900 border border-slate-700 text-amber font-black py-3.5 rounded-xl shadow-lg active:bg-slate-800 transition flex items-center justify-center space-x-2 text-center text-center">
                    <i class="fa-solid fa-user-shield text-blue-400 text-center text-center"></i>
                    <span class="tracking-widest uppercase text-[10px] text-center text-center">Admin: Steward Desk</span>
                </button>
            </div>
        </div>




        <div id="guideDrawer" class="drawer-right fixed inset-0 w-full bg-[#020617] z-[250] flex flex-col shadow-2xl text-center text-center">
            <button onclick="document.getElementById('guideDrawer').classList.remove('open')" class="flex-none w-full bg-slate-800 py-6 font-black uppercase tracking-[0.4em] text-white border-b border-slate-700 flex justify-center items-center text-center">
                <i class="fa-solid fa-arrow-left mr-3 text-center"></i> Back to Lobby
            </button>
            <div class="scrollable-area p-6 space-y-8 text-slate-300 text-left text-center">
                
                <section class="text-center text-center text-center">
                    <h4 class="text-amber font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 text-center">Technical Administration</h4>
                    <button onclick="forceUpdateApp()" class="w-full flex items-center justify-center space-x-2 bg-slate-900 text-slate-400 border border-slate-700 font-black py-4 rounded-lg active:text-amber transition shadow-inner text-center text-center">
                        <i class="fa-solid fa-rotate text-lg text-center text-center" id="updateSpinnerInternal"></i>
                        <span class="text-[10px] uppercase tracking-widest text-center text-center">Wipe Cache & Update Version</span>
                    </button>
                </section>


                <section class="text-center text-center text-center">
                    <h4 class="text-amber font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 text-center text-center">1. Purpose of the Application</h4>
                    <p class="text-xs leading-relaxed text-center text-center">Sea Diary: Match Edition Pro is a specialized platform for managing sea angling tournaments in real-time. This version (v5.3.0) features predictive focus engines, a static Scottish common species list, and automated keyboard handling optimized for shoreline environments.</p>
                </section>


                <section class="text-center text-center text-center">
                    <h4 class="text-blue-400 font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 text-center text-center">2. The Marshall Perspective (Steward)</h4>
                    <p class="text-xs leading-relaxed mb-3 text-center text-center">Steward controls are housed in the dedicated **Admin Desk** drawer. Here, you can strike match ends, initiate grace periods, or transfer room control to another competitor.</p>
                </section>
            </div>
        </div>




        <div id="historyDetailDrawer" class="drawer-right fixed inset-0 w-full bg-[#020617] z-[150] flex flex-col shadow-2xl hidden text-center text-center text-center">
            <button onclick="closeHistoryDetail()" class="flex-none w-full bg-slate-900 py-6 font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-800 flex justify-center items-center active:bg-slate-800 transition text-center text-center">
                <i class="fa-solid fa-xmark mr-3 text-center"></i> Exit Vault
            </button>
            <div class="flex-none flex bg-slate-900 p-2 space-x-2 border-b border-slate-800 shadow-md text-center text-center">
                <button id="tab-standings" onclick="switchHistoryTab('standings')" class="history-tab flex-1 py-4 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] transition bg-slate-800 text-slate-400 border border-slate-700 uppercase text-center text-center">Leader Board</button>
                <button id="tab-record" onclick="switchHistoryTab('record')" class="history-tab flex-1 py-4 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] transition bg-slate-800 text-slate-400 border border-slate-700 uppercase text-center text-center text-center">Diary</button>
            </div>
            <div id="historyContent" class="scrollable-area p-6 text-center text-center"></div>
        </div>




        <div id="stewardDrawer" class="drawer-left fixed inset-0 w-full bg-[#020617] z-[101] flex flex-col shadow-2xl text-center text-center text-center">
            <button onclick="document.getElementById('stewardDrawer').classList.remove('open')" class="flex-none w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-6 uppercase tracking-[0.3em] flex justify-center items-center active:bg-slate-900 border-b border-slate-800 transition text-center text-center text-center"><i class="fa-solid fa-arrow-left mr-3 text-center"></i> RETURN</button>
            <div class="flex-none p-4 bg-slate-950 border-b border-slate-900 text-center shadow-sm text-center text-center text-center text-center"><h2 class="font-black text-lg text-blue-400 uppercase tracking-[0.2em] text-center text-center text-center"><i class="fa-solid fa-user-shield mr-2 text-center text-center"></i> Steward Desk</h2></div>
            <div class="scrollable-area p-8 space-y-8 text-center text-center text-center text-center">
                <hr class="border-slate-800 text-center text-center text-center">
                <button onclick="transferSteward()" class="w-full bg-slate-900 border-2 border-slate-800 text-slate-400 font-black py-5 rounded-2xl shadow-md flex justify-center items-center uppercase tracking-widest text-xs active:text-amber transition text-center text-center text-center text-center text-center"><i class="fa-solid fa-right-left mr-3 text-amber text-center text-center"></i> Transfer Control</button>
                <hr class="border-slate-800 pt-4 text-center text-center text-center">
                <button onclick="endMatchEarly(true)" class="w-full bg-amber text-slate-900 font-black py-5 rounded-2xl shadow-lg uppercase tracking-widest text-base leading-tight active:scale-95 transition-transform text-center text-center text-center">Change Ending Time</button>
                <hr class="border-slate-800 pt-4 text-center text-center text-center text-center text-center">
                <button onclick="shareMasterLeaderboard()" class="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-md flex justify-center items-center uppercase tracking-widest text-xs active:bg-blue-700 transition text-center text-center text-center"><i class="fa-solid fa-file-export mr-3 text-center"></i> Master Export</button>
            </div>
        </div>


    </div>


    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, set, onValue, update, get, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


        const firebaseConfig = {
            apiKey: "AIzaSyAEDi6Zr6eR88jfCiBE05zTiXaRtd3dioY",
            authDomain: "sea-diary-match.firebaseapp.com",
            databaseURL: "https://sea-diary-match-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "sea-diary-match",
            storageBucket: "sea-diary-match.firebasestorage.app",
            messagingSenderId: "32868968041",
            appId: "1:32868968041:web:a5c7547cbd69c323cb64f8"
        };


        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);


        let uid = localStorage.getItem('matchUid');
        if (!uid) {
            uid = 'u_' + Date.now() + Math.floor(Math.random() * 1000);
            localStorage.setItem('matchUid', uid);
        }


        let state = {
            view: 'home',
            name: '',
            venue: '',
            isHost: false,
            pin: '',
            format: 'length',
            endTime: null,
            graceEndTime: null,
            myCatches: [],
            editingId: null,
            status: 'idle'
        };


        let activeHistoryId = null;
        let globalMatchData = null;
        let clockInterval = null;
        let hypeInterval = null;
        let historyUpdateInterval = null;
        let countdownActive = false;
        let alert20Played = false;
        let isArchiveOpen = false;


        function saveState() {
            localStorage.setItem('matchState', JSON.stringify(state));
        }


        function navTo(viewId) {
            document.querySelectorAll('.view-frame').forEach(el => el.classList.add('hidden'));
            const target = document.getElementById(`view-${viewId}`);
            if (target) target.classList.remove('hidden');
            state.view = viewId;
            if (viewId === 'history') renderHistory();
            saveState();
        }


        function proceedToRoleSelection() {
            const pEl = document.getElementById('playerName');
            const vEl = document.getElementById('venueName');
            
            let pName = pEl.value || "";
            let vName = vEl.value || "";
            
            pName = pName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
            vName = vName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
            
            pEl.value = pName;
            vEl.value = vName;
            
            state.name = pName; 
            state.venue = vName;
            
            if(navigator.vibrate) navigator.vibrate(20);
            saveState();
            navTo('role');
        }




        function exitApp() {
            if (confirm("CLOSE APP?\n\nLobby inputs will clear. History safe.")) {
                localStorage.removeItem('matchState');
                state = { status: 'idle', pin: null };
                clearInterval(clockInterval);
                clearInterval(hypeInterval);
                clearInterval(historyUpdateInterval);
                navTo('kill');
            }
        }


        async function forceUpdateApp() {
            if (confirm("Hard Reset App Cache?")) {
                const spin = document.getElementById('updateSpinnerInternal');
                if (spin) spin.classList.add('fa-spin');
                localStorage.removeItem('matchState');
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    for (let r of regs) await r.unregister();
                }
                setTimeout(() => { location.reload(); }, 500);
            }
        }


        function handleInputFocus(el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }




        function formatScoreDisplay(val, fmt) {
            if (fmt === 'weightLb') {
                let lbs = Math.floor(val / 16);
                let oz = val % 16;
                return `${lbs}lb ${oz}oz`;
            }
            if (fmt === 'weightKg') {
                let kg = Math.floor(val / 1000);
                let g = val % 1000;
                return `${kg}kg ${g}g`;
            }
            return val;
        }




        let atmPin = "";
        function atmPress(num) {
            if (atmPin.length < 4) {
                atmPin += num;
                if(navigator.vibrate) navigator.vibrate(10);
                updateAtm();
                if (atmPin.length === 4) connectToMatch();
            }
        }


        function atmDelete() {
            atmPin = atmPin.slice(0, -1);
            if(navigator.vibrate) navigator.vibrate(10);
            updateAtm();
        }


        function updateAtm() {
            for (let i = 1; i <= 4; i++) {
                const el = document.getElementById(`pin-${i}`);
                if (el) el.innerText = atmPin[i-1] || "";
            }
        }


        function listenToCloud() {
            if(!state.pin) return;
            onValue(ref(db, 'matches/' + state.pin), (snapshot) => {
                if (snapshot.exists()) {
                    globalMatchData = snapshot.val();
                    processCloudUpdate();
                } else if (['waiting', 'playing', 'grace', 'hype'].includes(state.status)) {
                    resetApp();
                }
            });
        }


        function showNotification(msg) {
            const toast = document.getElementById('broadcastToast');
            document.getElementById('broadcastMsg').innerText = msg;
            toast.classList.add('show');
            playTone(600, 0.2);
            setTimeout(() => { toast.classList.remove('show'); }, 8000);
        }




        function processCloudUpdate() {
            if (state.view === 'waiting' && globalMatchData.anglers) {
                const list = document.getElementById('attendanceList');
                if (list) {
                    let anglers = Object.values(globalMatchData.anglers);
                    list.innerHTML = anglers.map(a => `
                        <div class="match-card p-4 font-bold text-slate-100 flex justify-between items-center text-center">
                            <span><i class="fa-solid fa-user-check text-green-500 mr-3 animate-pulse text-center"></i> ${a.name}</span>
                            <span class="text-[8px] text-slate-400 uppercase tracking-widest text-center">Linked</span>
                        </div>`).join('');
                }
            }


            if (globalMatchData.status === 'playing') {
                state.endTime = globalMatchData.endTime;
                if (state.view !== 'fishing' && state.status !== 'hype') beginFishing(false);
            }


            if (globalMatchData.status === 'hype' && state.status !== 'hype') runGlobalCountdown();


            if (globalMatchData.status === 'grace' && state.status !== 'grace') {
                state.graceEndTime = globalMatchData.graceEndTime;
                state.endTime = globalMatchData.endTime; 
                state.status = 'grace';
                if(state.view !== 'fishing') navTo('fishing');
                document.getElementById('graceLabel').classList.remove('hidden');
                document.getElementById('app-container').classList.add('grace-active');
                showNotification("5 MINUTE GRACE.");
                saveState();
            }


            if (globalMatchData.status === 'finished' && state.status !== 'finished') lockdownMatch(false);
            
            if (globalMatchData.hostId === uid) {
                state.isHost = true;
                const stewardBtn = document.getElementById('btnStewardPanelContainer');
                if (stewardBtn && (state.status === 'playing' || state.status === 'grace')) stewardBtn.classList.remove('hidden');
            }
            renderGlobalLeaderboard();
        }


        function updateLiveTally() {
            let total = state.myCatches.reduce((sum, c) => sum + c.points, 0);
            const box = document.getElementById('liveTallyBox');
            if (box) box.innerText = formatScoreDisplay(total, state.format);
        }


        function pushMyScoreToCloud() {
            if(!state.pin) return;
            updateLiveTally();
            let total = state.myCatches.reduce((sum, c) => sum + c.points, 0);
            update(ref(db, `matches/${state.pin}/anglers/${uid}`), { name: state.name || "Angler", score: total, catches: state.myCatches });
        }


        function createMatch() {
            state.name = document.getElementById('playerName').value || "Steward";
            state.venue = document.getElementById('venueName').value || "Unknown Venue";
            state.isHost = true;
            state.format = document.getElementById('hostFormat').value;
            state.pin = Math.floor(1000 + Math.random() * 9000).toString(); 
            set(ref(db, 'matches/' + state.pin), { 
                hostId: uid, 
                format: state.format, 
                status: 'waiting', 
                anglers: { [uid]: { name: state.name, score: 0 } } 
            }).then(() => {
                state.status = 'waiting';
                listenToCloud();
                document.getElementById('displayPin').innerText = state.pin;
                navTo('waiting');
            });
        }


        function connectToMatch() {
            state.name = document.getElementById('playerName').value || "Angler";
            state.venue = document.getElementById('venueName').value || "Match Location";
            state.pin = atmPin;
            state.status = 'waiting';
            get(ref(db, 'matches/' + state.pin)).then((snapshot) => {
                if (snapshot.exists()) {
                    state.format = snapshot.val().format;
                    listenToCloud();
                    update(ref(db, `matches/${state.pin}/anglers/${uid}`), { name: state.name, score: 0 });
                    if(snapshot.val().status === 'playing' || snapshot.val().status === 'grace') {
                        state.endTime = snapshot.val().endTime;
                        state.status = snapshot.val().status;
                        beginFishing(false);
                    } else navTo('waiting');
                } else { alert("Invalid PIN."); atmPin = ""; updateAtm(); }
            });
        }


        function exitWaitingRoom() { if (confirm("Cancel?")) { if (state.isHost) remove(ref(db, 'matches/' + state.pin)); resetApp(); } }


        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playTone(freq, duration) {
            if(audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + duration);
        }
        function playHorn() { playTone(200, 1.5); }


        function triggerHypeStart() {
            if(!state.isHost) return;
            const matchDuration = parseFloat(document.getElementById('hostDuration').value);
            update(ref(db, 'matches/' + state.pin), { status: 'hype', endTime: Date.now() + (matchDuration * 3600000) + 6000 });
        }




        function runGlobalCountdown() {
            if (countdownActive) return;
            countdownActive = true;
            state.status = 'hype';
            navTo('hype');
            document.getElementById('hypeCount').classList.remove('hidden');
            let count = 5;
            document.getElementById('hypeCount').innerText = count;
            playTone(400, 0.1);
            if(navigator.vibrate) navigator.vibrate(50);
            hypeInterval = setInterval(() => {
                count--;
                if (count > 0) { 
                    document.getElementById('hypeCount').innerText = count; 
                    playTone(400, 0.1); 
                    if(navigator.vibrate) navigator.vibrate(50);
                } else { 
                    clearInterval(hypeInterval);
                    triggerSplashSequence();
                }
            }, 1000);
        }




        function triggerSplashSequence() {
            document.getElementById('hypeCount').classList.add('hidden');
            playHorn();
            if(navigator.vibrate) navigator.vibrate([200, 100, 200]);
            setTimeout(() => {
                countdownActive = false;
                if(state.isHost) update(ref(db, 'matches/' + state.pin), { status: 'playing' });
                beginFishing(false);
            }, 1500);
        }




        function focusMeasurement() {
            let el = document.getElementById('inputSize');
            if (state.format === 'weightLb') el = document.getElementById('inputLbs');
            if (state.format === 'weightKg') el = document.getElementById('inputKg');
            if (el) { 
                el.focus(); 
                handleInputFocus(el); 
            }
        }




        function checkSpeciesSelection() {
            const select = document.getElementById('inputSpecies');
            if (select.value === "[ADD OTHER]") { 
                promptCustomSpecies(); 
            } else if (state.format === 'speciesHunt') {
                document.getElementById('btnRecord').focus();
            } else {
                focusMeasurement(); 
            }
        }




        function promptCustomSpecies() {
            let name = prompt("Name:");
            if (name) {
                let grp = document.getElementById('customSpeciesGroup');
                let opt = document.createElement('option');
                opt.value = name; opt.innerText = name; opt.selected = true;
                grp.insertBefore(opt, grp.lastElementChild); 
                if (state.format !== 'speciesHunt') focusMeasurement();
                else document.getElementById('btnRecord').focus();
            } else document.getElementById('inputSpecies').value = ""; 
        }




        function beginFishing(isPushing) {
            state.status = 'playing'; navTo('fishing');
            pushMyScoreToCloud();
            const label = document.getElementById('labelSize');
            const sizeDeck = document.getElementById('deckSizeInputs');
            if (state.format === 'speciesHunt') sizeDeck.classList.add('hidden');
            else {
                sizeDeck.classList.remove('hidden');
                document.getElementById('deckLength').classList.add('hidden'); 
                document.getElementById('deckWeightLb').classList.add('hidden'); 
                document.getElementById('deckWeightKg').classList.add('hidden'); 
                if (state.format === 'weightLb') { document.getElementById('deckWeightLb').classList.remove('hidden'); label.innerText = "Weight (Lbs/Oz)"; } 
                else if (state.format === 'weightKg') { document.getElementById('deckWeightKg').classList.remove('hidden'); label.innerText = "Weight (Kg/g)"; } 
                else { document.getElementById('deckLength').classList.remove('hidden'); label.innerText = "Measurement (cm)"; }
            }
            startClock();
        }




        function startClock() {
            clearInterval(clockInterval);
            clockInterval = setInterval(() => {
                let now = Date.now();
                if (state.status === 'playing') {
                    let remaining = state.endTime - now;
                    if (remaining <= 0) { playHorn(); if (state.isHost) update(ref(db, 'matches/' + state.pin), { status: 'grace', graceEndTime: Date.now() + 300000 }); }
                    else updateTimerDisplay(remaining);
                } else if (state.status === 'grace') {
                    let graceRem = state.graceEndTime - now;
                    if (graceRem <= 0) { if (state.isHost) update(ref(db, 'matches/' + state.pin), { status: 'finished' }); }
                    else updateTimerDisplay(graceRem);
                }
            }, 1000);
        }




        function updateTimerDisplay(ms) {
            let totalSec = Math.max(0, Math.floor(ms / 1000));
            let hours = Math.floor(totalSec / 3600);
            let mins = Math.floor((totalSec % 3600) / 60);
            let secs = totalSec % 60;
            if (document.getElementById('mainTimer')) document.getElementById('mainTimer').innerText = `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }




        function recordCatch() {
            let species = document.getElementById('inputSpecies').value;
            if(!species) { if(navigator.vibrate) navigator.vibrate(200); return alert("Select species first!"); }
            let finalSize = 0; let displaySize = ""; let pts = 0;
            if (state.format === 'weightLb') { 
                let lbs = parseInt(document.getElementById('inputLbs').value) || 0; 
                let oz = parseInt(document.getElementById('inputOz').value) || 0; 
                finalSize = (lbs * 16) + oz; displaySize = `${lbs}lb ${oz}oz`; pts = finalSize;
            } else if (state.format === 'weightKg') {
                let kg = parseInt(document.getElementById('inputKg').value) || 0; 
                let g = parseInt(document.getElementById('inputGrammes').value) || 0; 
                finalSize = (kg * 1000) + g; displaySize = `${kg}kg ${g}g`; pts = finalSize;
            } else if (state.format === 'speciesHunt') { finalSize = 1; displaySize = "Captured"; } 
            else { finalSize = parseFloat(document.getElementById('inputSize').value) || 0; displaySize = finalSize.toString(); pts = finalSize; if (state.format === 'length10') pts = finalSize + 10; }


            if (state.format !== 'speciesHunt' && (finalSize <= 0 || isNaN(finalSize))) { if(navigator.vibrate) navigator.vibrate(200); alert("SIZE REQUIRED."); return; }
            if (state.editingId) { 
                let obj = state.myCatches.find(x => x.id === state.editingId); 
                if(obj) { obj.species = species; obj.size = finalSize; obj.display = displaySize; obj.points = pts; } 
                state.editingId = null; document.getElementById('btnRecord').innerText = "Record Catch"; 
            } else { 
                state.myCatches.unshift({ id: Date.now().toString(), species: species, size: finalSize, display: displaySize, points: pts, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }); 
            }
            document.getElementById('inputSpecies').value = ""; document.getElementById('inputSize').value = ""; document.activeElement.blur(); 
            if(navigator.vibrate) navigator.vibrate([50, 30, 50]);
            saveState(); renderCatchList(); pushMyScoreToCloud();
        }




        function editCatch(id) {
            let obj = state.myCatches.find(x => x.id === id);
            if(obj) {
                document.getElementById('inputSpecies').value = obj.species;
                if (state.format === 'weightLb') { document.getElementById('inputLbs').value = Math.floor(obj.size / 16); document.getElementById('inputOz').value = obj.size % 16; } 
                else if (state.format === 'weightKg') { document.getElementById('inputKg').value = Math.floor(obj.size / 1000); document.getElementById('inputGrammes').value = obj.size % 1000; } 
                else if (state.format !== 'speciesHunt') document.getElementById('inputSize').value = obj.size; 
                state.editingId = id; document.getElementById('btnRecord').innerText = "Update Record"; focusMeasurement();
            }
        }




        function deleteCatch(id) {
            if (!confirm("Delete?")) return;
            state.myCatches = state.myCatches.filter(x => x.id !== id);
            saveState(); renderCatchList(); pushMyScoreToCloud();
        }




        function renderCatchList() {
            const list = document.getElementById('localCatchList'); if (!list) return;
            list.innerHTML = state.myCatches.map(c => `
                <div class="match-card p-3.5 flex justify-between items-center mb-1 shadow-md text-center">
                    <div class="flex-1 text-center">
                        <span class="font-black text-white text-base uppercase">${c.species}</span>
                        <span class="text-xs ml-2 text-slate-400 font-bold">${c.display || c.size}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <button onclick="editCatch('${c.id}')" class="text-blue-400 p-2 active:scale-90 transition"><i class="fa-solid fa-pencil text-base"></i></button>
                        <button onclick="deleteCatch('${c.id}')" class="text-amber p-2 active:text-red-500 transition"><i class="fa-solid fa-trash-can text-base"></i></button>
                    </div></div>`).join('');
        }




        function renderGlobalLeaderboard() {
            if(!globalMatchData || !globalMatchData.anglers) return;
            const list = document.getElementById('leaderboardList'); if (!list) return;
            let arr = Object.values(globalMatchData.anglers).sort((a,b) => b.score - a.score);
            list.innerHTML = arr.map((a, i) => `
                <div class="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex justify-between items-center mb-1.5 shadow-sm border-l-4 ${i===0?'border-l-amber': i===1?'border-l-slate-300': i===2?'border-l-orange-700':'border-l-blue-600'} text-center">
                    <div class="flex items-center truncate w-2/3">
                        <span class="font-bold ${i===0?'text-amber':'text-slate-500'} text-sm w-6 text-left">${i+1}.</span>
                        <span class="font-bold text-slate-100 text-sm uppercase truncate">${a.name}</span>
                    </div>
                    <div class="font-bold text-lg text-white text-right w-1/3">
                        ${formatScoreDisplay(a.score, state.format)}
                    </div></div>`).join('');
            if(state.format !== 'speciesHunt') {
                let biggestVal = 0; let biggestStr = "Waiting...";
                arr.forEach(angler => { if(angler.catches) { Object.values(angler.catches).forEach(fish => { if(fish.size > biggestVal) { biggestVal = fish.size; biggestStr = `${angler.name} - ${fish.species} - ${fish.display || fish.size}`; } }); } });
                if (document.getElementById('bountyBanner')) document.getElementById('bountyBanner').innerText = biggestStr; 
            }
        }




        function stewardSetNewEnd(mins) {
            document.getElementById('customEndModal').classList.add('hidden');
            document.getElementById('stewardDrawer').classList.remove('open');
            if(mins === 0) { update(ref(db, 'matches/' + state.pin), { status: 'grace', endTime: Date.now(), graceEndTime: Date.now() + 300000 }); }
            else update(ref(db, 'matches/' + state.pin), { status: 'playing', endTime: Date.now() + (mins * 60000), graceEndTime: null });
        }




        function transferSteward() {
            if(!globalMatchData || !globalMatchData.anglers) return;
            let options = Object.entries(globalMatchData.anglers).filter(([key]) => key !== uid).map(([key, val]) => ({ id: key, name: val.name }));
            if(options.length === 0) return alert("No other competitors.");
            let msg = "Select Angler Number:\n\n" + options.map((opt, i) => `${i + 1}: ${opt.name}`).join('\n');
            let choice = prompt(msg);
            let idx = parseInt(choice) - 1;
            if (!isNaN(idx) && idx >= 0 && idx < options.length) {
                if(confirm(`Transfer control to ${options[idx].name}?`)) { update(ref(db, 'matches/' + state.pin), { hostId: options[idx].id }); document.getElementById('stewardDrawer').classList.remove('open'); }
            }
        }




        function leaveMatchEarly() { if (confirm("LEAVE?")) { saveHistory(true); resetApp(); } }




        function lockdownMatch(isHostPushing) {
            clearInterval(clockInterval); if(isHostPushing && state.isHost) update(ref(db, 'matches/' + state.pin), { status: 'finished' });
            saveHistory(false); state.status = 'finished'; saveState();
            let totalPts = state.myCatches.reduce((s,c) => s + c.points, 0);
            document.getElementById('finalScore').innerText = formatScoreDisplay(totalPts, state.format);
            navTo('results');
        }




        function saveHistory(isL) {
            let h = JSON.parse(localStorage.getItem('matchHistory') || '[]');
            h.unshift({ id: 'match_' + Date.now(), pin: state.pin, venue: state.venue, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), format: state.format, score: state.myCatches.reduce((s,c) => s+c.points, 0), personalCatches: [...state.myCatches], standings: globalMatchData?.anglers ? Object.values(globalMatchData.anglers).sort((a,b) => b.score - a.score) : [], playerName: state.name, isLive: isL, endTime: state.endTime, graceEndTime: state.graceEndTime || (state.endTime + 300000) });
            localStorage.setItem('matchHistory', JSON.stringify(h));
        }




        function renderHistory() {
            let h = JSON.parse(localStorage.getItem('matchHistory') || '[]');
            const r = document.getElementById('historyRecentList'); 
            r.innerHTML = h.length === 0 ? '<p class="text-slate-400 py-24 font-black uppercase text-xs text-center">Empty</p>' : "";
            h.forEach((m, i) => {
                let card = document.createElement('div');
                card.className = "match-card p-5 flex flex-col items-center mb-3 text-center";
                card.innerHTML = `<div class="flex-1 text-center"><span class="font-black text-white text-base">${m.date}</span><br><span class="text-[9px] text-slate-400 font-bold uppercase">${m.venue || 'No Venue'}</span><br><span class="text-2xl font-black text-white">${formatScoreDisplay(m.score, m.format)}</span></div>`;
                if(i < 6) r.appendChild(card);
            });
        }




        function resetApp() { localStorage.removeItem('matchState'); location.reload(); }




        window.onload = () => {
            const saved = localStorage.getItem('matchState');
            if (saved) {
                try {
                    let oldState = JSON.parse(saved);
                    state.name = oldState.name || ""; state.venue = oldState.venue || "";
                    document.getElementById('playerName').value = state.name; document.getElementById('venueName').value = state.venue;
                    if (['playing', 'grace', 'hype', 'waiting'].includes(oldState.status)) {
                        state = oldState; listenToCloud(); navTo(state.view);
                        if (state.status === 'playing' || state.status === 'grace') { renderCatchList(); startClock(); updateLiveTally(); }
                    }
                } catch(e) { resetApp(); }
            }
        };


        /* GLOBAL EXPOSURE */
        window.atmPress = atmPress; window.atmDelete = atmDelete; window.navTo = navTo; window.createMatch = createMatch; window.connectToMatch = connectToMatch; window.triggerHypeStart = triggerHypeStart; window.recordCatch = recordCatch; window.editCatch = editCatch; window.deleteCatch = deleteCatch; window.leaveMatchEarly = leaveMatchEarly; window.stewardSetNewEnd = stewardSetNewEnd; window.resetApp = resetApp; window.forceUpdateApp = forceUpdateApp; window.toggleWakeLock = async () => { if(wakeLock) { await wakeLock.release(); wakeLock = null; } else { try { wakeLock = await navigator.wakeLock.request('screen'); } catch(e) {} } }; window.proceedToRoleSelection = proceedToRoleSelection; window.handleInputFocus = handleInputFocus; window.transferSteward = transferSteward;


    </script>
</body>
</html>
