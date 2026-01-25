import { getProfile } from "../api/profile/read.js";
import { followProfile } from "../api/profile/follow.js";
import { unfollowProfile } from "../api/profile/unfollow.js";
import { getAuth } from "../utilities/storage.js";

const profileHeader = document.getElementById("profileHeader");
const profileStatus = document.getElementById("profileStatus");
const profilePosts = document.getElementById("profilePosts");
const backBtn = document.getElementById("backToFeedBtn");

const auth = getAuth();
if (!auth?.accessToken) {
  window.location.href = "/auth/login/index.html";
}

const params = new URLSearchParams(window.location.search);
const urlName = params.get("name");
const profileName = urlName || auth.name;

function renderProfileHeader(profile) {
  const isMe = profile.name === auth.name;

  const followersCount = profile._count?.followers ?? 0;
  const followingCount = profile._count?.following ?? 0;
  const postsCount = profile._count?.posts ?? 0;

  const isFollowing = profile.followers?.some((f) => f.name === auth.name);

  profileHeader.innerHTML = `
    <div class="mb-[1.4rem] rounded-2xl border border-[rgba(31,41,55,0.9)] bg-[rgba(15,23,42,0.9)] px-[1.4rem] py-[1.3rem] shadow-[0_16px_30px_rgba(0,0,0,0.75)] max-md:px-[1.1rem] max-md:py-[1.1rem]">
      <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4 max-md:grid-cols-[auto_1fr] max-md:grid-rows-[auto_auto]">
        <div class="profile-avatar-tw h-16 w-16 overflow-hidden rounded-full border-2 border-[rgba(56,189,248,0.7)] flex items-center justify-center max-[480px]:h-14 max-[480px]:w-14">
          ${
            profile.avatar?.url
              ? `<img class="h-full w-full object-cover" src="${profile.avatar.url}" alt="${profile.avatar.alt || profile.name}" />`
              : `<div class="text-[1.6rem] font-semibold text-slate-900">${profile.name
                  .charAt(0)
                  .toUpperCase()}</div>`
          }
        </div>

        <div>
          <h1 class="m-0 mb-[0.2rem] text-[1.3rem] font-semibold max-md:text-[1.2rem]">${profile.name}</h1>
          <p class="m-0 text-[0.85rem] text-[var(--text-muted)]">${profile.email}</p>

          <p class="m-0 mt-2 flex flex-wrap gap-2 text-[0.85rem] text-[var(--text-muted)] max-[480px]:text-[0.8rem] max-[480px]:gap-[0.4rem]">
            <span class="rounded-full border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] px-2 py-[0.1rem] max-[480px]:px-[0.4rem]">
              ${followersCount} followers
            </span>
            <span class="rounded-full border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] px-2 py-[0.1rem] max-[480px]:px-[0.4rem]">
              ${followingCount} following
            </span>
            <span class="rounded-full border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] px-2 py-[0.1rem] max-[480px]:px-[0.4rem]">
              ${postsCount} posts
            </span>
          </p>
        </div>

        <div class="flex items-center justify-end max-md:col-span-full max-md:justify-start max-md:mt-3">
          ${
            isMe
              ? `<span class="rounded-full bg-[rgba(22,163,74,0.15)] px-3 py-1.5 text-[0.85rem] text-[var(--text-success)] max-[480px]:text-[0.8rem]">
                  This is me 🫶
                 </span>`
              : `<button id="followBtn" class="inline-flex items-center justify-center rounded-[var(--radius-full)] border border-[rgba(148,163,184,0.25)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[rgba(148,163,184,0.08)] transition">
                  ${isFollowing ? "Unfollow" : "Follow"}
                 </button>`
          }
        </div>
      </div>
    </div>
  `;

  if (!isMe) {
    const followBtn = document.getElementById("followBtn");
    followBtn?.addEventListener("click", async () => {
      try {
        profileStatus.textContent = isFollowing ? "Unfollowing..." : "Following...";
        if (isFollowing) {
          await unfollowProfile(profile.name);
        } else {
          await followProfile(profile.name);
        }
        await loadProfile();
      } catch (error) {
        console.error(error);
        profileStatus.textContent = error.message || "Failed to update follow.";
      }
    });
  }
}

function renderProfilePosts(profile) {
  const posts = profile.posts || [];
  profilePosts.innerHTML = "";

  if (!posts.length) {
    profilePosts.innerHTML =
      '<p class="text-sm text-[var(--text-muted)]">This user has no posts yet.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const card = document.createElement("article");

    card.className =
      "rounded-2xl border border-[rgba(31,41,55,0.9)] bg-[rgba(15,23,42,0.9)] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.65)]";

    const created = post.created ? new Date(post.created).toLocaleString() : "";

    card.innerHTML = `
      <header class="flex items-start justify-between gap-4">
        <div>
          <h2 class="m-0 text-[1.05rem] font-semibold text-[var(--text-main)]">
            ${post.title || "Untitled post"}
          </h2>
          <p class="m-0 mt-1 text-xs text-[var(--text-muted)]">
            ${created ? created : ""}
          </p>
        </div>
      </header>

      <p class="mt-3 text-[0.95rem] leading-relaxed text-[var(--text-main)]/90">
        ${post.body ? post.body.slice(0, 200) : "No content."}
        ${post.body && post.body.length > 200 ? "..." : ""}
      </p>

      <footer class="mt-4">
        <button
          class="inline-flex items-center justify-center rounded-[var(--radius-full)] border border-[rgba(148,163,184,0.25)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[rgba(148,163,184,0.08)] transition"
          data-id="${post.id}"
        >
          View post
        </button>
      </footer>
    `;

    fragment.appendChild(card);
  });

  profilePosts.appendChild(fragment);

  profilePosts.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `/post/read/?id=${id}`;
    });
  });
}

async function loadProfile() {
  try {
    profileStatus.textContent = "Loading profile...";
    const profile = await getProfile(profileName);
    profileStatus.textContent = "";
    renderProfileHeader(profile);
    renderProfilePosts(profile);
  } catch (error) {
    console.error(error);
    profileStatus.textContent = error.message || "Could not load profile.";
  }
}

backBtn?.addEventListener("click", () => {
  window.location.href = "/post/index.html";
});

loadProfile();
