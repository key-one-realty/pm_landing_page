import { create } from "zustand";
import { PageSections } from "../utils/enums";

interface ComponentStoreState {
    serviceSection: HTMLElement | null
    aboutSection: HTMLElement | null
    contactSection: HTMLElement | null
    homeSection: HTMLElement | null
    sectionInView: PageSections | null
    observer: IntersectionObserver | null
    showPopupForm: boolean
    popupFormSection: HTMLElement | null
    setServiceSection: (ref: HTMLElement | null) => void
    setAboutSection: (ref: HTMLElement | null) => void
    setContactSection: (ref: HTMLElement | null) => void
    setHomeSection: (ref: HTMLElement | null) => void
    handleSectionInView: (ref: HTMLElement | null, sectionEnum: PageSections) => IntersectionObserver
    setSectionInView: (section: PageSections) => void
    setShowPopupForm: (show: boolean) => void
    setPopupFormSection: (ref: HTMLElement | null) => void
}

export const useComponentStore = create<ComponentStoreState>()(
    
 (set) => ({
        serviceSection: null,
        aboutSection: null,
        contactSection: null,
        homeSection: null,
        sectionInView: PageSections.HOME,
        observer: null,
        showPopupForm: false,
        popupFormSection: null,
        setServiceSection: (ref: HTMLElement | null) => set({ serviceSection: ref }),
        setAboutSection: (ref: HTMLElement | null) => set({ aboutSection: ref }),
        setContactSection: (ref: HTMLElement | null) => set({ contactSection: ref }),
        setHomeSection: (ref: HTMLElement | null) => set({ homeSection: ref }),
        setPopupFormSection: (ref: HTMLElement | null) => set({ popupFormSection: ref }),
        handleSectionInView: (ref: HTMLElement | null, sectionEnum: PageSections) => {
            const observer = new IntersectionObserver(([entry]) => {
                if(entry.isIntersecting){
                    // console.log(`${sectionEnum.valueOf()} is intersecting`);
                    set(() => ({
                        sectionInView: sectionEnum
                    }))
                }
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.4
            })

            if (ref){
                observer.observe(ref);
            }

            return observer;
        },
        setSectionInView: (section: PageSections) => {
            set(() => ({
                sectionInView: section
            }))
        },
        setShowPopupForm: (show: boolean) => {
            set((state: any) => {
                if(typeof window !== 'undefined'){
                    if(show){
                        document.body.style.overflow = "hidden"
                        const popupFormRef = state.popupFormSection;
                        
                        if(popupFormRef){
                            popupFormRef.style.top = `${window.scrollY}px`;
                            popupFormRef.style.left = "0";
        
                            // console.log(`Pop Up form style: ${JSON.stringify(popupFormRef.style)}`);
                            
                        } else {
                            console.log("pop up form ref form is undefined");
                        }
                    } else {
                        document.body.style.overflow = "auto";
                    }
                }
                return {
                showPopupForm: show
            }})
        }
    }))
